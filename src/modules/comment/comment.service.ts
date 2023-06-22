import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel, PaginateResult } from 'mongoose';
import { COMMENT } from 'src/common/constants/schemas';
import { CommentDocument } from './schema/comment.schema';
import { CreateCommentDTO, FilterCommentDTO, UpdateCommentDTO } from './dto';
import { UserDocument } from '../user/schema/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(COMMENT)
    private readonly commentModel: PaginateModel<CommentDocument>,
  ) {}

  async fetchComments(
    filter?: FilterCommentDTO,
  ): Promise<PaginateResult<CommentDocument>> {
    const { page = 1, limit = 10, search } = filter;

    const query: FilterQuery<CommentDocument> = {
      softDelete: false,
    };

    if (search) {
      query.$or = [{ comment: { $regrex: search, $options: 'i' } }];
    }

    return await this.commentModel.paginate(query, {
      page,
      limit,
      sort: { comment: -1 },
      populate: [{ path: 'user' }],
    });
  }

  async createComment(
    user: UserDocument,
    createCommentDTO: CreateCommentDTO,
  ): Promise<CommentDocument> {
    return await this.commentModel.create({ ...createCommentDTO, user });
  }

  async updateComment(
    comment: CommentDocument,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<CommentDocument> {
    const commentDocument = await this.commentModel.findOneAndUpdate(
      {
        _id: comment._id,
        softDelete: false,
      },
      { $set: updateCommentDTO },
      { new: true },
    );

    if (!commentDocument) throw new NotFoundException('Comment does not exist');

    return commentDocument;
  }

  async deleteComment(comment: CommentDocument): Promise<CommentDocument> {
    const commentDocument = await this.commentModel.findOneAndUpdate(
      {
        _id: comment._id,
        softDelete: false,
      },
      { $set: { softDelete: true } },
      { new: true },
    );

    if (!commentDocument) throw new NotFoundException('Comment does not exist');

    return commentDocument;
  }

}
