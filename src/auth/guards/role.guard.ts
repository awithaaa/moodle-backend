import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/public/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findByEmail(request.user.username);
    if (user.role === 'ADMIN') return true;
    return false;
  }
}
