import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class UploadFileDto extends Dto<UploadFileDto> {
  @IsString()
  fileId: string;

  @IsString()
  fileName: string;
}
