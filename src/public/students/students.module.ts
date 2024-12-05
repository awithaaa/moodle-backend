import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, JwtService],
})
export class StudentsModule {}
