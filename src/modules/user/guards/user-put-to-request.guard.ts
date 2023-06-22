import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserDocument } from '../schema/user.schema';
import { UserService } from '../user.service';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const user: UserDocument = await this.userService.authenticateUser(
      params.userId,
    );

    request.__user = user;

    return true;
  }
}
