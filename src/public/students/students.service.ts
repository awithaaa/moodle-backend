import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AddStudentDto } from './dto/add-student.dto';
import { AddTokenDto } from './dto/add-token.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addStudent(dto: AddStudentDto, token: string) {
    try {
      const tokenResult =
        await this.prismaService.studentRegisterToken.findUnique({
          where: { id: token },
        });
      if (!tokenResult)
        throw new UnauthorizedException('Token does not exsist!');

      if (tokenResult.onSubmit)
        throw new HttpException(
          'Submission has already done!',
          HttpStatus.UNAUTHORIZED,
        );

      const password = Math.random().toString(36).substring(2, 12);
      console.log(password);
      const hashh = await hash(password, 10);

      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: dto.lastName,
          password: hashh,
        },
      });

      const student = await this.prismaService.student.create({
        data: {
          courseLevel: dto.courseLevel,
          address: dto.address,
          gender: dto.gender,
          dateOfBirth: dto.dateOfBirth,
          phoneNumber: dto.phoneNumber,
          createdBy: dto.createdBy,
          userId: user.id,
        },
      });

      return {
        message: 'Student registered successfully!',
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async createStudentRegisterToken(dto: AddTokenDto) {
    const token = this.prismaService.studentRegisterToken.create({
      data: { ...dto },
    });
    return token;
  }

  async findTokenById(id: string) {
    const token = await this.prismaService.studentRegisterToken.findUnique({
      where: { id: id },
    });
    if (!token) throw new NotFoundException('Token does not exsist.');

    return token;
  }

  async deleteTokenById(id: string) {
    const token = await this.prismaService.studentRegisterToken.findUnique({
      where: { id: id },
    });
    if (!token) throw new NotFoundException('Token does not exsist.');

    await this.prismaService.studentRegisterToken.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'Token Deleted Successfully!',
    };
  }
}
