import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AddTokenDto extends Dto<AddTokenDto> {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  onSubmit: boolean;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}
