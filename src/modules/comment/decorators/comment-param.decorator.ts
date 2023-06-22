import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { CommentPutToRequestGuard } from '../guards/comment-put-to-request.guard';
import { CommentNotFoundGuard } from '../guards/comment-not-found.guard';
import { CommentDocument } from '../schema/comment.schema';

export function CommentParamGuard(): MethodDecorator {
  return applyDecorators(
    UseGuards(CommentPutToRequestGuard, CommentNotFoundGuard),
  );
}

export const GetCommentFromParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CommentDocument => {
    const request = ctx.switchToHttp().getRequest();
    const { __comment } = request;

    return __comment;
  },
);
