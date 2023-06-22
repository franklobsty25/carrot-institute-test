import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { UserDocument } from '../schema/user.schema';
import { UserPutToRequestGuard } from '../guards/user-put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user-not-found.guard';

export function UserParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export const GetUserFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __user } = request;

    return __user;
  },
);
