import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('animals')
class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome_ou_brinco: string;

  @Column()
  user_id: string;

  @Column('time with time zone')
  carencia: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
