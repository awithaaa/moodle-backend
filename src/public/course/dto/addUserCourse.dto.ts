import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddUserCourseDto extends Dto<AddUserCourseDto> {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  courseId: number;
}
