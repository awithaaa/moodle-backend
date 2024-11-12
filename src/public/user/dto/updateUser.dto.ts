import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdateUserDto extends Dto<UpdateUserDto> {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
