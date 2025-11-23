import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  author!: string;

  @Column({ type: 'int', default: 1 })
  available_copies!: number;

  @CreateDateColumn()
  created_at!: Date;
}
