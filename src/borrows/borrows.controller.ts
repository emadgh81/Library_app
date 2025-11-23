import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BorrowsService } from './borrows.service';
import { BorrowDto } from './dto/borrow.dto';
import { ReturnDto } from './dto/return.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLES } from 'src/auth/roles.decorator';
import { Request } from 'express';
@UseGuards(AuthGuard('jwt'))
@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowService: BorrowsService) {}

  @Post('borrow')
  borrow(@Req() req: Request, @Body() dto: BorrowDto) {
    const userId = req.user!.id;
    return this.borrowService.borrowBook(userId, dto.bookId);
  }

  @Post('return')
  return(@Req() req: Request, @Body() dto: ReturnDto) {
    const userId = req.user!.id;
    return this.borrowService.returnBook(userId, dto.borrowId);
  }

  @Get('me')
  myBorrows(@Req() req: Request) {
    return this.borrowService.findUserBorrow(req.user!.id);
  }

  @UseGuards(RolesGuard)
  @ROLES('admin')
  @Get()
  all() {
    return this.borrowService.findAll();
  }
}
