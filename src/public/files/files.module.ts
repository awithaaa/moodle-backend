import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { DriveService } from 'src/utility/drive/drive.service';

@Module({
  controllers: [FilesController],
  providers: [DriveService],
})
export class FilesModule {}
