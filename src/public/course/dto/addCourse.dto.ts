import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddCourseDto extends Dto<AddCourseDto> {
  @ApiProperty()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty()
  @IsOptional()
  details?: any;
}
