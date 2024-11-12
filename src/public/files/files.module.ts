import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { DriveService } from 'src/utility/drive/drive.service';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [DriveService, FilesService],
})
export class FilesModule {}
