import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { DriveService } from 'src/utility/drive/drive.service';
import { FilesController } from './files.controller';
import { DriveModule } from 'src/utility/drive/drive.module';

@Module({
  imports: [forwardRef(() => DriveModule)],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
