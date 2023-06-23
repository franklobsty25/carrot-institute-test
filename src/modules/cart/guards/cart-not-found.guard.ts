import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class CartNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { __cart } = context.switchToHttp().getRequest();
  
      if (!__cart) throw new NotFoundException('Cart does not exist');
  
      return true;
    }
  }