import { ObjectType, Field, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from './Participation';
import { User } from './User';

@ObjectType()
@Entity()
export class Agenda extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @Field(() => String)
  @Column()
  venue!: string;

  @Field(() => [Participation])
  @OneToMany(() => Participation, (participation) => participation.agenda)
  participation: Participation[];

  @Field(() => String)
  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Field(() => String)
  @Column({ type: 'timestamp' })
  endTime!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.agendas)
  organizer: User;

  @Field(() => Int)
  @Column()
  organizerId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
