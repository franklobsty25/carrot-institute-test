import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { MenuDocument } from '../schema/menu.schema';
import { MenuPutToRequestGuard } from '../guards/menu-put-to-request.guard';
import { MenuNotFoundGuard } from '../guards/menu-not-found.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AccessGuard } from '../guards/access-guard';

export function MenuAccessGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      MenuPutToRequestGuard,
      MenuNotFoundGuard,
      AccessGuard,
    ),
  );
}

export function MenuParamGuard(): MethodDecorator{
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      MenuPutToRequestGuard,
      MenuNotFoundGuard,
    ),
  );
}

export const GetMenuFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): MenuDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __menu } = request;

    return __menu;
  },
);
