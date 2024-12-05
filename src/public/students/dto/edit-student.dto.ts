import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class EditStudentDto extends Dto<EditStudentDto> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  courseLevel?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
