import { ObjectType, Field } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agenda } from './Agenda';
import { Participation } from './Participation';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => [Agenda])
  @OneToMany(() => Agenda, (agenda) => agenda.organizer)
  agendas?: Agenda[];

  @Field(() => [Participation])
  @OneToMany(() => Participation, (participation) => participation.user)
  participation?: Participation[];
}
