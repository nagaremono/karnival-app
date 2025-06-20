import { ObjectType, Field, Int } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participation } from './Participation';
import { User } from './User';

@ObjectType()
@Entity()
export class Agenda {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field(() => String)
  @Column({ name: 'organizer_id' })
  organizerId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.agendas)
  @JoinColumn({ name: 'organizer_id' })
  organizer?: User;

  @Field(() => String)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
