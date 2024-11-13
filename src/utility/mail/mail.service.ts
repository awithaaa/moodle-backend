import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/sendEmail.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('EMAIL_HOST'),
      port: +this.configService.get<string>('PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  // Send email
  async sendEmail(dto: SendEmailDto) {
    try {
      const { to, subject, html, text } = dto;
      const mailOptions = {
        from: this.configService.get('SMTP_USER'),
        to,
        subject,
        text,
        html,
      };
      return await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error.message);
    }
  }
}
