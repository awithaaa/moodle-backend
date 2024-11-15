import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/public/user/dto/user-create.dto';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Req() req) {
    return await this.authSevice.login(req.user);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.authSevice.create(dto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req) {
    return await this.authSevice.refreshToken(req.user);
  }
}
