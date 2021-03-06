import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import VacineToAnimal from './VacineToAnimal';

@Entity('vacines')
class Vacine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => VacineToAnimal, vacineToAnimal => vacineToAnimal.vacine, {
    cascade: true,
  })
  vacine_to_animals: VacineToAnimal[];

  @Column('int')
  dose_number: number;

  @Column('int')
  doses_period: number;

  @Column('time with time zone')
  date: Date;

  @Column('text')
  anotacoes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vacine;
