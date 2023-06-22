import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    UseGuards,
  } from '@nestjs/common';
import { MenuDocument } from '../schema/menu.schema';
import { MenuPutToRequestGuard } from '../guards/menu-put-to-request.guard';
import { MenuNotFoundGuard } from '../guards/menu-not-found.guard';
  
  export function MenuParamGuard(): MethodDecorator {
    return applyDecorators(UseGuards(MenuPutToRequestGuard, MenuNotFoundGuard));
  }
  
  export const GetMenuFromParam = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): MenuDocument => {
      const request = ctx.switchToHttp().getRequest();
      const { __menu } = request;
  
      return __menu;
    },
  );
  