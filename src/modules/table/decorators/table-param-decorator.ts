import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { TablePutToRequestGuard } from '../guards/table-put-to-request.guard';
import { TableNotFoundGuard } from '../guards/table-not-found.guard';
import { TableDocument } from '../schema/table.schema';

export function TableParamGuard(): MethodDecorator {
  return applyDecorators(UseGuards(TablePutToRequestGuard, TableNotFoundGuard));
}

export const GetTableFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TableDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __table } = request;

    return __table;
  },
);
