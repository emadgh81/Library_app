import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('borrows')
export class Borrw {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user!: User;

  @ManyToOne(() => Book, (book) => book.id, { eager: true })
  book!: Book;

  @CreateDateColumn()
  borrow_date!: Date;

  @Column({ type: 'datetime', nullable: true })
  return_date!: Date | null;
}
