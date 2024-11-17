import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddPaymentDto extends Dto<AddPaymentDto> {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  courseId: number;

  @ApiProperty()
  @IsString()
  month: string;

  @ApiProperty()
  @IsNumber()
  paymentAmount: number;
}
