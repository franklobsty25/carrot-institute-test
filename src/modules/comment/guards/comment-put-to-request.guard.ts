import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { COMMENT } from 'src/common/constants/schemas';
import { CommentDocument } from '../schema/comment.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentPutToRequestGuard implements CanActivate {
  constructor(
    @InjectModel(COMMENT) private readonly commentModel: Model<CommentDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    const comment: CommentDocument = await this.commentModel.findById(
      params.commentId,
    );

    request.__comment = comment;

    return true;
  }
}
