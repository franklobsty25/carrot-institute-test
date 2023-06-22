import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  @Injectable()
  export class TableNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { __table } = context.switchToHttp().getRequest();
  
      if (!__table) throw new NotFoundException('Table does not exist');
  
      return true;
    }
  }