import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class RestaurantNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { __restaurant } = context.switchToHttp().getRequest();
  
      if (!__restaurant) throw new NotFoundException('Restaurant does not exist');
  
      return true;
    }
  }