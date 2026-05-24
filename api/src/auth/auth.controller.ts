import { Controller, Post, Body, Headers, HttpCode } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';

class AuthDto {
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: AuthDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('login')
  @HttpCode(200)
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Post('logout')
  @HttpCode(200)
  signOut(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '') ?? '';
    return this.authService.signOut(token);
  }
}
