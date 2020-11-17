import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Animal from './Animal';
import Vacine from './Vacine';

@Entity('vacines_to_animals')
class VacineToAnimals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vacine, vacine => vacine.vacine_to_animals)
  @JoinColumn({ name: 'vacine_id' })
  vacine: Vacine;

  @ManyToOne(() => Animal, animal => animal.vacine_to_animal)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column()
  animal_id: string;

  @Column()
  vacine_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VacineToAnimals;
