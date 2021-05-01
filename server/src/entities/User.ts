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

  @Column({ unique: false, nullable: true })
  password?: string;

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  githubId?: string;

  @Field(() => [Agenda])
  @OneToMany(() => Agenda, (agenda) => agenda.organizer)
  agendas: Agenda[];

  @Field(() => [Participation])
  @OneToMany(() => Participation, (participation) => participation.user)
  participation: Participation[];
}
