// files.controller.ts
import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriveService } from 'src/utility/drive/drive.service';

@Controller('files')
export class FilesController {
  constructor(private readonly googleDriveService: DriveService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.googleDriveService.uploadFile(file);
  }

  @Delete('delete')
  async deleteFile(@Query('fileId') fileId: string) {
    return await this.googleDriveService.deleteFile(fileId);
  }

  @Get('download')
  async downloadFile(@Query('fileId') fileId: string) {
    return await this.googleDriveService.downloadFile(fileId);
  }
}
