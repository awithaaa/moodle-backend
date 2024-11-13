import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class SendEmailDto extends Dto<SendEmailDto> {
  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsString()
  @IsOptional()
  text?: string;
}
