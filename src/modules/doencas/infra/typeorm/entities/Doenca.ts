import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Animal from '@modules/animals/infra/typeorm/entities/Animal';

@Entity('doencas')
class Doenca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  animal_id: string;

  @ManyToOne(() => Animal)
  @JoinColumn({ name: 'animal_id' })
  animal: Animal;

  @Column()
  nome_doenca: string;

  @Column('date')
  data: Date;

  @Column()
  descricao: string;

  @Column()
  remedios: string;

  @Column()
  periodo_carencia: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doenca;
