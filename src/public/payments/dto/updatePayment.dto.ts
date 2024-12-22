import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UpdatePaymentDto extends Dto<UpdatePaymentDto> {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  courseId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  month?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  paymentAmount?: number;
}
