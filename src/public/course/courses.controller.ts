import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AddCourseDto } from './dto/addCourse.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Post('add')
  async addCourse(@Body() dto: AddCourseDto) {
    return await this.courseService.addCourse(dto);
  }

  @Delete()
  async deleteCourse(@Query('id') id: number) {
    return await this.courseService.deleteCourse(id);
  }
}
