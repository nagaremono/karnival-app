import { ObjectType, Field, Int, ID } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from './Participation';
import { User } from './User';

@ObjectType()
@Entity()
export class Agenda extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  venue: string;

  @Field(() => [Participation])
  @OneToMany(() => Participation, (participation) => participation.agenda)
  participation?: Participation[];

  @Field(() => Date)
  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Field(() => Date)
  @Column({ name: 'end_time', type: 'timestamptz' })
  endTime: Date;

  @Field(() => Int)
  @Column({ name: 'organizer_id' })
  organizerId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.agendas)
  organizer?: User;

  @Field(() => String)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
