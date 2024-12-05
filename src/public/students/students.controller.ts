import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { AddStudentDto } from './dto/add-student.dto';
import { AddTokenDto } from './dto/add-token.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('add/:token')
  async addStudent(@Body() dto: AddStudentDto, @Param('token') token: string) {
    return await this.studentsService.addStudent(dto, token);
  }

  @Post('token')
  @UseGuards(JwtAuthGuard)
  async createToken(@Body('createdBy') createdBy: number) {
    return await this.studentsService.createStudentRegisterToken(createdBy);
  }

  @Get('token/:id')
  async findTokenById(@Param('id') id: string) {
    return await this.studentsService.findTokenById(id);
  }

  @Post('token/:id')
  async submitTokenById(@Param('id') id: number) {
    return await this.studentsService.submitTokenById(id);
  }
}
