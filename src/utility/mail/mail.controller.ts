import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/sendEmail.dto';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() dto: SendEmailDto) {
    return await this.mailService.sendEmail(dto);
  }
}
