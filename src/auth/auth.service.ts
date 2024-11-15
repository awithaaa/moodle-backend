import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/public/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { AuthUserDto } from 'src/public/user/dto/authUser.dto';
import { LoginResDto } from './dto/loginRes.dto';
import { CreateUserDto } from 'src/public/user/dto/user-create.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    const authUser = new AuthUserDto({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    return new LoginResDto({
      user: { ...authUser },
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '15m',
          secret: this.configService.getOrThrow('JWT_SECRET'),
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    });
  }

  async create(dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    return user;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.configService.getOrThrow('JWT_SECRET'),
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      }),
    };
  }
}
