import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdateUserByAdminDto extends Dto<UpdateUserByAdminDto> {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
