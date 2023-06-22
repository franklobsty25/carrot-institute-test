import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentNotFoundGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { __comment } = context.switchToHttp().getRequest();

    if (!__comment) throw new NotFoundException('Comment does not exist');

    return true;
  }
}
