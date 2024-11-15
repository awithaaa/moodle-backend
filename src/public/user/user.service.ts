import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { hash } from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
      dto.password = await hash(dto.password, 10);
    }

    const updateUser = await this.prismaService.user.update({
      where: { email: email },
      data: { ...dto },
    });

    const { password, ...res } = updateUser;

    return res;
  }
}
