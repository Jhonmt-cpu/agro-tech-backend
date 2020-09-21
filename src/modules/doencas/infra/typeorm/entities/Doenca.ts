import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('doencas')
class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  animal_id: string;

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

export default Animal;
