import { Global, Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { FilesModule } from 'src/public/files/files.module';

@Module({
  controllers: [],
  providers: [DriveService, FilesModule],
  exports: [DriveService],
})
export class DriveModule {}
