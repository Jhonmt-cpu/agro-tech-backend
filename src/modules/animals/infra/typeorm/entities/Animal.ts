import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('animals')
class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_ou_brinco: string;

  @Column()
  peso: number;

  @Column('date')
  nascimento: Date;

  @Column()
  raca: string;

  @Column()
  sexo: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  anotacoes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Animal;
