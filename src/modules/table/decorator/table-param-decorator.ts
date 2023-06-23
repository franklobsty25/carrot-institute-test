import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { TablePutToRequestGuard } from '../guards/table-put-to-request.guard';
import { TableNotFoundGuard } from '../guards/table-not-found.guard';
import { TableDocument } from '../schema/table.schema';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AccessGuard } from '../guards/access-guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

export function TableAccessGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      RoleGuard,
      TablePutToRequestGuard,
      TableNotFoundGuard,
      AccessGuard,
    ),
  );
}

export function TableParamGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      RoleGuard,
      TablePutToRequestGuard,
      TableNotFoundGuard,
    ),
  );
}

export const GetTableFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TableDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __table } = request;

    return __table;
  },
);
