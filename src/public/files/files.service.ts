import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileDto } from './dto/uploadfile.dto';
import { DriveService } from 'src/utility/drive/drive.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleDriveService: DriveService,
  ) {}

  // Upload file to the storage and save it in db
  async uploadFile(dto: UploadFileDto) {
    try {
      const file = await this.prismaService.file.create({
        data: { ...dto },
      });
      return { message: 'File Saved Successfully!', data: file };
    } catch (error) {
      console.log(error);
    }
  }

  // Delete file in the storage and delete it from db
  async deleteFile(fileId: string) {
    const file = await this.prismaService.file.findUnique({
      where: { fileId: fileId },
    });
    if (!file) throw new NotFoundException('File not found!');

    await this.prismaService.file.delete({
      where: { fileId: fileId },
    });
    await this.googleDriveService.deleteFile(fileId);
    return {
      message: 'File deleted Successfully!',
    };
  }
}
