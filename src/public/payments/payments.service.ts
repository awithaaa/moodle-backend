import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { AddPaymentDto } from './dto/addPayment.dto';
import { UserService } from '../user/user.service';
import { UpdatePaymentDto } from './dto/updatePayment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async addPayment(dto: AddPaymentDto) {
    // Find User
    const user = await this.userService.findById(dto.userId);
    if (!user) throw new NotFoundException('User not found!');

    // Find Course
    const course = await this.prismaService.course.findUnique({
      where: { id: dto.courseId },
    });
    if (!course) throw new NotFoundException('Course not found!');

    // Find is User in course
    const userCourse = await this.prismaService.userCourse.findFirst({
      where: {
        AND: [{ userId: dto.userId }, { courseId: dto.courseId }],
      },
    });
    if (!userCourse) throw new NotFoundException('User not found in course!');

    return await this.prismaService.payment.create({
      data: {
        ...dto,
      },
    });
  }

  async getAllPayments() {
    return await this.prismaService.payment.findMany({
      select: {
        id: true,
        courseId: true,
        userId: true,
        month: true,
        paymentAmount: true,
        createdAt: true,
        user: {
          select: {
            student: { select: { id: true } },
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getPaymentById(id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { id: id },
      select: {
        id: true,
        courseId: true,
        userId: true,
        month: true,
        paymentAmount: true,
        createdAt: true,
        user: {
          select: {
            student: { select: { id: true } },
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!payment) throw new NotFoundException('Payment not found');

    return payment;
  }

  async getLastPaymentByUserId(id: number, month: number) {
    // Find User
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('User not found!');

    const payment = await this.prismaService.payment.findFirst({
      where: {
        userId: id,
        month: month,
      },
    });
    if (!payment) throw new NotFoundException('Payment not found!');
    return payment;
  }

  async editPaymentById(dto: UpdatePaymentDto, id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { id: id },
    });
    if (!payment) throw new NotFoundException('Payment not found');

    const updatedPayment = await this.prismaService.payment.update({
      where: { id: id },
      data: { ...dto },
    });
    if (!updatedPayment) throw new BadRequestException();

    return {
      message: 'Payment Updated Successfuly!',
    };
  }

  async deletePaymentById(id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { id: id },
    });
    if (!payment) throw new NotFoundException('Payment not found');

    await this.prismaService.payment.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'Payment deleted Successfuly!',
    };
  }
}
