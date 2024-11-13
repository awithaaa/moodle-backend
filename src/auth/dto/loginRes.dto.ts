import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { AuthUserDto } from 'src/public/user/dto/authUser.dto';

export class LoginResDto extends Dto<LoginResDto> {
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };

  user: AuthUserDto;
}
