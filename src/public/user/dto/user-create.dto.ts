import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class CreateUserDto extends Dto<CreateUserDto> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  @IsOptional()
  role?: Role;
}
