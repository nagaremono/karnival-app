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
import { MyContext } from '../types';
import { attachIdentity, isAuth } from '../middlewares/isAuth';
import { Participation } from '../entities/Participation';
import { User } from '../entities/User';
import dataSource from '../datasource';

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
@UseMiddleware(attachIdentity)
export class AgendaResolver {
  @FieldResolver(() => User)
  organizer(@Root() agenda: Agenda, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(agenda.organizerId);
  }

  @FieldResolver(() => Boolean)
  async isParticipating(
    @Root() agenda: Agenda,
    @Ctx() { participationLoader, req }: MyContext,
  ) {
    if (!req.user) {
      return false;
    }

    const participation = await participationLoader.load({
      userId: req.user.id,
      agendaId: agenda.id,
    });

    return !!participation;
  }

  @Mutation(() => Boolean)
  async toggleParticipation(
    @Arg('agendaId', () => Int) agendaId: number,
    @Arg('isParticipating') isParticipating: boolean,
    @Ctx() { req }: MyContext,
  ) {
    if (!req.user.id) {
      return false;
    }

    if (isParticipating) {
      await dataSource
        .createQueryBuilder()
        .delete()
        .from(Participation)
        .where('"userId" = :userId and "agendaId" = :agendaId', {
          userId: req.user.id,
          agendaId,
        })
        .execute();
    } else {
      await Participation.create({
        agendaId,
        userId: req.user.id,
      }).save();
    }

    return true;
  }

  @Query(() => Agenda)
  async agenda(@Arg('agendaId', () => Int) agendaId: number) {
    const agenda = await dataSource
      .getRepository(Agenda)
      .createQueryBuilder('agenda')
      .leftJoinAndSelect('agenda.organizer', 'organizer')
      .leftJoinAndSelect('agenda.participation', 'participation')
      .leftJoinAndSelect('participation.user', 'user')
      .where('agenda.id = :agenda_id')
      .setParameter('agenda_id', agendaId)
      .getOne();

    return agenda;
  }

  @Query(() => [Agenda], { nullable: true })
  async agendas(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: number | null,
    @Arg('from', () => String, {
      nullable: true,
    })
    from = new Date(),
  ): Promise<Agenda[]> {
    const actualLimit = Math.min(10, limit);
    let qb = dataSource.manager
      .createQueryBuilder(Agenda, 'agenda')
      .orderBy('agenda.startTime', 'ASC')
      .where('agenda.startTime > :from', { from })
      .take(actualLimit);

    if (cursor) {
      qb = qb.where('agenda.startTime > :cursor', {
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
    @Ctx() { req }: MyContext,
  ): Promise<Agenda | null> {
    const result = await dataSource
      .createQueryBuilder()
      .update(Agenda)
      .set({ ...input })
      .where('id = :agendaId and organizer_id = :userId', {
        agendaId,
        userId: req.user.id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Agenda)
  @UseMiddleware(isAuth)
  createAgenda(
    @Arg('input') input: AgendaInput,
    @Ctx() { req }: MyContext,
  ): Promise<Agenda> {
    return dataSource.manager.save(Agenda, {
      ...input,
      organizerId: req.user.id,
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteAgenda(
    @Arg('agendaId', () => Int) agendaId: number,
    @Ctx() { req }: MyContext,
  ): Promise<boolean> {
    await Participation.delete({ agendaId });
    await dataSource.manager.delete(Agenda, {
      id: agendaId,
      organizerId: req.user.id,
    });

    return true;
  }
}
