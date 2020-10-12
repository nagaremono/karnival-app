import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agenda } from './Agenda';
import { Participation } from './Participation';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  password!: string;

  @Field(() => [Agenda])
  @OneToMany(() => Agenda, (agenda) => agenda.organizer)
  agendas: Agenda[];

  @Field(() => [Participation])
  @OneToMany(() => Participation, (participation) => participation.user)
  participation: Participation[];
}
