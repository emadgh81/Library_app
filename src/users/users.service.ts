import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async create(
    username: string,
    password: string,
    role: 'user' | 'admin' = 'user',
  ) {
    const user = this.usersRepo.create({ username, password, role });
    return await this.usersRepo.save(user);
  }

  async FindByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
