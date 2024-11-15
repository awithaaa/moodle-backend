import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriveModule } from './utility/drive/drive.module';
import { FilesModule } from './public/files/files.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './public/user/user.module';
import { MailModule } from './utility/mail/mail.module';
import { PrismaModule } from './lib/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DriveModule,
    FilesModule,
    MailModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
