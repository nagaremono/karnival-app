import { Agenda } from '../entities/Agenda';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from 'src/types';
import { isAuth } from '../middlewares/isAuth';
import { Participation } from '../entities/Participation';
import { getConnection } from 'typeorm';

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
  async agendas(): Promise<Agenda[]> {
    return Agenda.find({ relations: ['organizer'] });
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
