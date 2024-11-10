import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriveModule } from './utility/drive/drive.module';
import { FilesModule } from './public/files/files.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DriveModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
