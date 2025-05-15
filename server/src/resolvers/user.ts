import { User } from '../entities/User';
import { Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import dataSource from '../datasource';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return dataSource.manager.getRepository(User).findOne({
      where: {
        id: req.session.userId,
      },
    });
  }
}
