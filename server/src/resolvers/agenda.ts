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
  async isParticipating(
    @Root() agenda: Agenda,
    @Ctx() { participationLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return false;
    }

    const participation = await participationLoader.load({
      userId: req.session.userId,
      agendaId: agenda.id,
    });

    return participation ? true : false;
  }

  @Mutation(() => Boolean)
  async toggleParticipation(
    @Arg('agendaId', () => Int) agendaId: number,
    @Arg('isParticipating') isParticipating: boolean,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      return false;
    }

    if (isParticipating) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Participation)
        .where('"userId" = :userId and "agendaId" = :agendaId', {
          userId: req.session.userId,
          agendaId,
        })
        .execute();
    } else {
      await Participation.create({
        agendaId,
        userId: req.session.userId,
      }).save();
    }

    return true;
  }

  @Query(() => Agenda)
  async agenda(@Arg('agendaId', () => Int) agendaId: number) {
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

  @Mutation(() => Agenda, { nullable: true })
  @UseMiddleware(isAuth)
  async updateAgenda(
    @Arg('agendaId', () => Int) agendaId: number,
    @Arg('input') input: AgendaInput,
    @Ctx() { req }: MyContext
  ): Promise<Agenda | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Agenda)
      .set({ ...input })
      .where('id = :agendaId and "organizerId" = :userId', {
        agendaId,
        userId: req.session.userId,
      })
      .returning('*')
      .execute();

    return result.raw[0];
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAgenda(
    @Arg('agendaId', () => Int) agendaId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await Participation.delete({ agendaId });
    await Agenda.delete({ id: agendaId, organizerId: req.session.userId });

    return true;
  }
}
