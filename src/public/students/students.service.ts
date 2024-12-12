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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/utility/mail/mail.service';
import { Console } from 'console';
import { EditStudentDto } from './dto/edit-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async addStudent(dto: AddStudentDto, token: string) {
    try {
      const tokenResult =
        await this.prismaService.studentRegisterToken.findFirst({
          where: { token: token },
        });
      if (!tokenResult)
        throw new UnauthorizedException('Token does not exsist!');

      if (tokenResult.isSubmit)
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
          role: dto.role,
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

      // Submit the token
      await this.submitTokenById(tokenResult.id);

      // Email content
      const emailContent = {
        to: [dto.email],
        subject: 'User Account for kesara moodle',
        html: `<h2>Your moodle account has created!</h2><p>email: ${dto.email}<p> <p>password: ${password}<p><br><p>Enjoy your moodle access.</p>`,
      };
      const email = await this.mailService.sendEmail(emailContent);

      return {
        message: 'Student registered successfully!',
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllStudent() {
    return await this.prismaService.student.findMany({
      select: {
        id: true,
        gender: true,
        courseLevel: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async getStudentById(id: number) {
    const student = await this.prismaService.student.findUnique({
      where: { id: id },
      select: {
        id: true,
        address: true,
        courseLevel: true,
        createdAt: true,
        createdBy: true,
        dateOfBirth: true,
        gender: true,
        phoneNumber: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!student) throw new NotFoundException('Student does not found.');

    return student;
  }

  async editStudentById(id: number, dto: EditStudentDto) {
    const student = await this.prismaService.student.findUnique({
      where: { id: id },
    });
    if (!student) throw new NotFoundException('Student does not found.');

    const editStudent = await this.prismaService.student.update({
      where: { id: id },
      data: { ...dto },
    });

    return {
      message: 'Student Edit Successfully!',
    };
  }

  async deleteStudentById(id: number) {
    const student = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!student) throw new NotFoundException('Student does not found.');

    await this.prismaService.user.update({
      where: { id: id },
      data: {
        student: { delete: {} },
      },
      include: { student: true },
    });

    return {
      message: 'User account and Student deleted successfully!',
    };
  }

  async createStudentRegisterToken(createdBy: number) {
    const payload = {
      type: 'Student',
      createdBy: createdBy,
    };
    const jwtToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
    const token = this.prismaService.studentRegisterToken.create({
      data: {
        token: jwtToken,
        isSubmit: false,
        createdBy: createdBy,
      },
    });
    return token;
  }

  async findTokenById(id: string) {
    const token = await this.prismaService.studentRegisterToken.findFirst({
      where: { token: id },
    });
    if (!token) throw new NotFoundException('Token does not exsist.');

    return token;
  }

  async submitTokenById(id: number) {
    const token = await this.prismaService.studentRegisterToken.findUnique({
      where: { id: id },
    });
    if (!token) throw new NotFoundException('Token does not exsist.');

    await this.prismaService.studentRegisterToken.update({
      where: { id: id },
      data: { isSubmit: true },
    });
    return {
      message: 'Token Submited Successfully!',
    };
  }
}
