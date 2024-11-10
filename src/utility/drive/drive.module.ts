import { Global, Module } from '@nestjs/common';
import { DriveService } from './drive.service';

@Module({
  controllers: [],
  providers: [DriveService],
})
export class DriveModule {}
