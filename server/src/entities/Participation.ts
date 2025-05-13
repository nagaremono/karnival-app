import { ObjectType, Field } from 'type-graphql';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Agenda } from './Agenda';
import { User } from './User';

@ObjectType()
@Entity()
export class Participation extends BaseEntity {
  @Field()
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Field()
  @PrimaryColumn({ name: 'agenda_id' })
  agendaId: string;

  @Field(() => Agenda, { nullable: true })
  @ManyToOne(() => Agenda, (agenda) => agenda.participation)
  agenda?: Agenda;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.participation)
  user?: User;
}
