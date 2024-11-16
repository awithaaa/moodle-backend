import { IsNotEmpty, IsOptional } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddCourseDto extends Dto<AddCourseDto> {
  @IsNotEmpty()
  courseName: string;

  @IsOptional()
  details?: any;
}
