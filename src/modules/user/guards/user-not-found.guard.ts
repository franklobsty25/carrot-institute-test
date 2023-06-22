import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class UserNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { __user } = context.switchToHttp().getRequest();
  
      if (!__user) throw new NotFoundException('User does not exist');
  
      return true;
    }
  }