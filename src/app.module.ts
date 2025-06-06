import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './public/user/user.module';
import { MailModule } from './utility/mail/mail.module';
import { PrismaModule } from './lib/prisma/prisma.module';
import { DriveModule } from './utility/drive/drive.module';
import { FilesModule } from './public/files/files.module';
import { CoursesModule } from './public/course/courses.module';
import { PaymentsModule } from './public/payments/payments.module';
import { StudentsModule } from './public/students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    MailModule,
    PrismaModule,
    DriveModule,
    FilesModule,
    CoursesModule,
    PaymentsModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
