import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookrepo: Repository<Book>,
  ) {}
  create(dto: CreateBookDto) {
    const book = this.bookrepo.create(dto);
    return this.bookrepo.save(book);
  }

  findAll() {
    return this.bookrepo.find();
  }

  async findOne(id: number) {
    const book = await this.bookrepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    return this.bookrepo.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookrepo.remove(book);
  }

  async decreaseCopy(id: number) {
    const book = await this.findOne(id);
    if (book.available_copies <= 0) throw new Error('No copies available');
    book.available_copies -= 1;
    return this.bookrepo.save(book);
  }

  async increaseCopy(id: number) {
    const book = await this.findOne(id);
    book.available_copies += 1;
    return this.bookrepo.save(book);
  }
}
