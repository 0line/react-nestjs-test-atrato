/**
 * TODO: Class for validate exist user for email
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new ForbiddenException({
        success: false,
        message: 'This email already exist',
        error: true,
        code: HttpStatus.FORBIDDEN,
      });
    }
    return true;
  }
}
