import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AddCourseDto } from './dto/addCourse.dto';
import { AddUserCourseDto } from './dto/addUserCourse.dto';
import { retry } from 'rxjs';

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

  async getCourseById(id: number) {
    const course = await this.prismaService.course.findUnique({
      where: { id: id },
    });
    if (!course) throw new NotFoundException('Course not found!');
    return course;
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

  // UserCourse

  async addUserIntoCourse(dto: AddUserCourseDto) {
    // Find User Id
    const user = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new NotFoundException('User not found!');

    // Find course Id
    const course = await this.prismaService.course.findUnique({
      where: { id: dto.courseId },
    });
    if (!course) throw new NotFoundException('Course not found!');

    // Add User into course
    const userCourse = await this.prismaService.userCourse.create({
      data: {
        userId: dto.userId,
        courseId: dto.courseId,
      },
    });
    return {
      message: 'User Added Successfully',
      userCourse: userCourse,
    };
  }

  async getAllUsersInCourse(id: number) {
    // Find course Id
    const course = await this.prismaService.course.findUnique({
      where: { id: id },
    });
    if (!course) throw new NotFoundException('Course not found!');

    return await this.prismaService.userCourse.findMany({
      where: { courseId: id },
    });
  }

  async deleteUserFromCourseById(id: number) {
    const userCourse = await this.prismaService.userCourse.findUnique({
      where: { id: id },
    });
    if (!userCourse) throw new NotFoundException('UserCourse not found!');

    const deleteUserCourse = await this.prismaService.userCourse.delete({
      where: { id: id },
    });

    return {
      message: 'User Removed Successfully!',
    };
  }
}
