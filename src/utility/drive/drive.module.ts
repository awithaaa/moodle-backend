import { forwardRef, Global, Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { FilesService } from 'src/public/files/files.service';
import { FilesModule } from 'src/public/files/files.module';

@Global()
@Module({
  imports: [forwardRef(() => FilesModule)],
  providers: [DriveService],
  exports: [DriveService],
})
export class DriveModule {}
