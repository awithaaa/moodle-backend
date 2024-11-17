import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class SendEmailDto extends Dto<SendEmailDto> {
  @ApiProperty()
  @IsEmail({}, { each: true })
  to: string[];

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  html: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;
}
