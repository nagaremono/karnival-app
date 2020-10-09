import { User } from '../entities/User';
import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { RegisterInput } from './RegisterInput';
import { validateRegister } from '../utils/validateRegister';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg('input') input: RegisterInput): Promise<UserResponse> {
    const errors = validateRegister(input);

    if (errors) {
      return {
        errors,
      };
    }

    const hashedPassword = await argon2.hash(input.password);
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: input.username,
          email: input.email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
    } catch (error) {
      if (error.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already exist',
            },
          ],
        };
      }
    }

    return { user };
  }
}
