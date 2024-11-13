import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/public/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
