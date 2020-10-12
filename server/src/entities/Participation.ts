import { ObjectType, Field } from 'type-graphql';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agenda } from './Agenda';
import { User } from './User';

@ObjectType()
@Entity()
export class Participation extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  agendaId: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.participation, { cascade: true })
  user: User;

  @Field(() => Agenda, { nullable: true })
  @ManyToOne(() => Agenda, (agenda) => agenda.participation, { cascade: true })
  agenda: Agenda;
}
