import { Agenda } from '../entities/Agenda';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from 'src/types';
import { isAuth } from '../middlewares/isAuth';
import { Participation } from '../entities/Participation';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';

@InputType()
class AgendaInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  venue!: string;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;
}

@Resolver(Agenda)
export class AgendaResolver {
  @FieldResolver(() => User)
  organizer(@Root() agenda: Agenda, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(agenda.organizerId);
  }

  @FieldResolver(() => Boolean)
  async isParticipating(@Root() agenda: Agenda, @Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return false;
    }

    const participation = await Participation.findOne({
      where: { userId: req.session.userId, agendaId: agenda.id },
    });

    return participation ? true : false;
  }

  @Query(() => Agenda)
  async agenda(@Arg('agendaId') agendaId: number) {
    const agenda = await getConnection()
      .getRepository(Agenda)
      .createQueryBuilder('agenda')
      .leftJoinAndSelect('agenda.organizer', 'organizer')
      .leftJoinAndSelect('agenda.participation', 'participation')
      .leftJoinAndSelect('participation.user', 'user')
      .where('agenda.id=:agenda_id')
      .setParameter('agenda_id', agendaId)
      .getOne();

    return agenda;
  }

  @Mutation(() => Boolean)
  async participate(
    @Arg('agendaId') agendaId: number,
    @Ctx() { req }: MyContext
  ) {
    await Participation.create({
      agendaId,
      userId: req.session.userId,
    }).save();

    return true;
  }

  @Query(() => [Agenda], { nullable: true })
  async agendas(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<Agenda[]> {
    const actualLimit = Math.min(10, limit);
    const qb = getConnection()
      .getRepository(Agenda)
      .createQueryBuilder('agenda')
      .orderBy('agenda."startTime"', 'ASC')
      .take(actualLimit);

    if (cursor) {
      qb.where('agenda."startTime" > :cursor', {
        cursor: new Date(cursor),
      });
    }

    return await qb.getMany();
  }

  @Mutation(() => Agenda)
  @UseMiddleware(isAuth)
  async createAgenda(
    @Arg('input') input: AgendaInput,
    @Ctx() { req }: MyContext
  ): Promise<Agenda> {
    return Agenda.create({
      ...input,
      organizerId: req.session.userId,
    }).save();
  }
}
