import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { AddStudentDto } from './dto/add-student.dto';
import { AddTokenDto } from './dto/add-token.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('add/:token')
  async addStudent(@Body() dto: AddStudentDto, @Param('token') token: string) {
    return await this.studentsService.addStudent(dto, token);
  }

  @Post('token')
  async createToken(@Body() dto: AddTokenDto) {
    return await this.studentsService.createStudentRegisterToken(dto);
  }

  @Get('token/:id')
  async findTokenById(@Param('id') id: string) {
    return await this.studentsService.findTokenById(id);
  }

  @Delete('token/:id')
  async deleteTokenById(@Param('id') id: string) {
    return await this.studentsService.deleteTokenById(id);
  }
}
