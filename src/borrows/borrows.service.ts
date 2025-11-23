import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrw } from './borrow.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrw) private readonly borrowRepo: Repository<Borrw>,
    private readonly bookService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async borrowBook(userId: number, bookId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const book = await this.bookService.findOne(bookId);
    if (!book) throw new NotFoundException('Book not found');
    if (book.available_copies <= 0)
      throw new BadRequestException('No copies available');

    await this.bookService.decreaseCopy(bookId);

    const borrow = this.borrowRepo.create({
      user,
      book,
      return_date: null,
    });
    return this.borrowRepo.save(borrow);
  }

  async returnBook(userId: number, borrowId: number) {
    const borrow = await this.borrowRepo.findOne({ where: { id: borrowId } });
    if (!borrow) throw new NotFoundException('Borrow record not found');
    if (borrow.user.id !== userId)
      throw new BadRequestException('Not your borrow');

    if (borrow.return_date) throw new BadRequestException('Already returned');

    borrow.return_date = new Date();
    await this.bookService.increaseCopy(borrow.book.id);
    return this.borrowRepo.save(borrow);
  }

  findAll() {
    return this.borrowRepo.find();
  }

  findUserBorrow(userId: number) {
    return this.borrowRepo.find({ where: { user: { id: userId } } });
  }
}
