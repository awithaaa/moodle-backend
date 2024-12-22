import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AddCourseDto } from './dto/addCourse.dto';
import { AddUserCourseDto } from './dto/addUserCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Get('id')
  async getCourseById(@Query('id') id: number) {
    return await this.courseService.getCourseById(id);
  }

  @Post('add')
  async addCourse(@Body() dto: AddCourseDto) {
    return await this.courseService.addCourse(dto);
  }

  @Patch('edit/:id')
  async editCourseById(@Body() dto: any, @Param('id') id: number) {
    return await this.courseService.editCourseById(dto, id);
  }

  @Patch('edit/details/:id')
  async editCourseDetailsById(
    @Body() dto: UpdateCourseDto,
    @Param('id') id: number,
  ) {
    return await this.courseService.editCourseDetailsById(dto, id);
  }

  @Delete()
  async deleteCourse(@Query('id') id: number) {
    return await this.courseService.deleteCourse(id);
  }

  // UserCourse

  @Post('add/user')
  async addUserIntoCourse(@Body() dto: AddUserCourseDto) {
    return await this.courseService.addUserIntoCourse(dto);
  }

  @Get('user')
  async getAllUserInCourse(@Query('courseId') courseId: number) {
    return await this.courseService.getAllUsersInCourse(courseId);
  }

  @Delete('user')
  async deleteUserFromCourseById(@Query('id') id: number) {
    return await this.courseService.deleteUserFromCourseById(id);
  }
}
