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

@InputType()
class AgendaInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  startTime!: Date;

  @Field()
  endTime!: Date;
}

@Resolver()
export class AgendaResolver {
  @Query(() => [Agenda], { nullable: true })
  async agendas(): Promise<Agenda[]> {
    return Agenda.find();
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
