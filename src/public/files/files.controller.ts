// files.controller.ts
import {
  Controller,
  Post,
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
    const response = await this.googleDriveService.uploadFile(file);
    return {
      fileId: response.id,
      webViewLink: response.webViewLink,
      webContentLink: response.webContentLink,
    };
  }

  /*
  @Get('download')
  async downloadFile(@Query('fileId') fileId: string) {
    const destinationPath = `./downloads/${fileId}`; // adjust path and extension
    await this.googleDriveService.downloadFile(fileId, destinationPath);
    return { message: 'File downloaded successfully', path: destinationPath };
  }*/
}
