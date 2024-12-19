import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddCourseDto extends Dto<AddCourseDto> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  day: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duration: string;

  @ApiProperty()
  @IsOptional()
  details?: any;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
