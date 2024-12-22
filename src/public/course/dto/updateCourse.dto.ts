import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdateCourseDto extends Dto<UpdateCourseDto> {
  @ApiProperty()
  @IsOptional()
  @IsString()
  courseName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  time?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  day?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  duration?: string;
}
