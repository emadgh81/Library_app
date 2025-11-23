import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.usersService.FindByUsername(username);
    if (existing) throw new ConflictException('Username already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hashed);
    return { message: 'User registered successfully', user };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.FindByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
