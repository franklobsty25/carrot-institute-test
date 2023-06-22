import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class MenuNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { __menu } = context.switchToHttp().getRequest();
  
      if (!__menu) throw new NotFoundException('Menu does not exist');
  
      return true;
    }
  }