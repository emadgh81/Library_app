import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    return this.authservice.register(body.username, body.password);
  }

  @Post('register')
  login(@Body() body: AuthDto) {
    return this.authservice.login(body.username, body.password);
  }
}
