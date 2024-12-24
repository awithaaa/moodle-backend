import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { hash, compare } from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserByAdminDto } from './dto/update-user-admin.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { MailService } from 'src/utility/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new ConflictException('Creadentials already taken.');
    }

    dto.password = await hash(dto.password, 10);
    const newUser = await this.prismaService.user.create({
      data: { ...dto },
    });

    const { password, ...res } = newUser;
    return res;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({});
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  async findById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        student: { select: { id: true } },
      },
    });
  }

  async updateUser(dto: UpdateUserDto, email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    if (dto.password) {
      return await this.updatePassword(dto.password, dto.currentPass, email);
    }

    const updateUser = await this.prismaService.user.update({
      where: { email: email },
      data: { ...dto },
    });

    const { password, ...res } = updateUser;

    return res;
  }

  private async updatePassword(
    pass: string,
    currentPass: string,
    email: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    const authenticated = await compare(currentPass, user.password);
    if (!authenticated) {
      throw new BadRequestException("Your Current Password doesn't match");
    }

    const passkey = await hash(pass, 10);

    const updateUser = await this.prismaService.user.update({
      where: { email: email },
      data: { password: passkey },
    });

    const { password, ...res } = updateUser;

    return res;
  }

  async updateUserById(id: number, dto: UpdateUserByAdminDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    await this.prismaService.user.update({
      where: { id: id },
      data: { ...dto },
    });

    return {
      message: 'User updated successfully!',
    };
  }

  async deleteUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    await this.prismaService.user.delete({
      where: { id: id },
    });

    return {
      message: 'User deleted successfully',
    };
  }

  // Pass key
  async generatePassToken(dto: any) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found!');

    const EXPIRE_TIME = 20 * 1000;
    const token = this.generateRandomToken(20);
    const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME);

    const passToken = await this.prismaService.userPasswordToken.create({
      data: {
        email: dto.email,
        token: token,
        expiresIn: expiresIn,
      },
    });
    if (!passToken) throw new BadRequestException('Something went wrong!');

    const emailContent = {
      to: [dto.email],
      subject: 'Kesara Moodle Account Recovery',
      html: `<h2>Hello, ${dto.email}</h2><br><p>Please click the link below to recover your moodle login credentials: </p> <br> <a href="http://localhost:3000/request/passkey/${token}">Resume Recovery</a>`,
    };
    const email = await this.mailService.sendEmail(emailContent);

    console.log(token);
    return {
      message: 'Token Generated Successfully!',
    };
  }

  async getPassToken(token: string) {
    const passToken = await this.prismaService.userPasswordToken.findUnique({
      where: { token: token },
    });
    if (!passToken) throw new NotFoundException('Token not found!');

    return passToken;
  }

  async changePassByToken(token: string, dto: any) {
    const passToken = await this.prismaService.userPasswordToken.findUnique({
      where: { token: token },
    });
    if (!passToken) throw new NotFoundException('Token not found!');
    if (new Date().getTime() < passToken.expiresIn)
      throw new NotFoundException('Token not found!');
    if (passToken.isSubmit)
      throw new NotFoundException('Token has already submited');

    dto.password = await hash(dto.password, 10);

    const updatePass = await this.prismaService.user.update({
      where: { email: passToken.email },
      data: {
        password: dto.password,
      },
    });

    const submitToken = await this.prismaService.userPasswordToken.update({
      where: { token: token },
      data: { isSubmit: true },
    });

    return {
      message: 'User password changed successfully!',
    };
  }

  private generateRandomToken(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
