import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AddCourseDto } from './dto/addCourse.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addCourse(dto: AddCourseDto) {
    try {
      const course = await this.prismaService.course.create({
        data: { ...dto },
      });
      return course;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCourses() {
    const courses = await this.prismaService.course.findMany({});
    return courses;
  }

  async deleteCourse(id: number) {
    const course = await this.prismaService.course.findUnique({
      where: { id: id },
    });
    if (!course) throw new NotFoundException('Course not found!');
    const delCourse = await this.prismaService.course.delete({
      where: { id: id },
    });
    return {
      message: 'Course Deleted Successfully!',
    };
  }
}
