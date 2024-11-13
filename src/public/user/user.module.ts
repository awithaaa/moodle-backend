import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, JwtService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
