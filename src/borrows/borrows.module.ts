import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrw } from './borrow.entity';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borrw]), BooksModule, UsersModule],
  controllers: [BorrowsController],
  providers: [BorrowsService],
})
export class BorrowsModule {}
