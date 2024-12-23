import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadFileDto } from './dto/uploadfile.dto';
import { DriveService } from 'src/utility/drive/drive.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(
    @Inject(forwardRef(() => DriveService))
    private readonly googleDriveService: DriveService,
    private readonly prismaService: PrismaService,
  ) {}

  // Upload file to the storage and save it in db
  async uploadFile(dto: UploadFileDto) {
    try {
      const file = await this.prismaService.file.create({
        data: { fileId: dto.fileId, fileName: dto.fileName },
      });
      return file;
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

  // Get file list
  async getAllFiles() {
    return await this.prismaService.file.findMany({});
  }
}
