import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response } from 'express';
import { ResponseService } from 'src/common/helpers/response.service';
import { CreateCommentDTO, FilterCommentDTO, UpdateCommentDTO } from './dto';
import { CurrentUser } from '../user/decoretors/current-user.decorator';
import { UserDocument } from '../user/schema/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentDocument } from './schema/comment.schema';
import {
  CommentParamGuard,
  GetCommentFromParam,
} from './decorators/comment-param.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async fetch(
    @Res() res: Response,
    @Query() payload: FilterCommentDTO,
  ): Promise<void> {
    try {
      const { docs, ...metadata } = await this.commentService.fetchComments(
        payload,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Comments fetched successfully',
        docs,
        metadata,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Res() res: Response,
    @CurrentUser() user: UserDocument,
    @Body() createComment: CreateCommentDTO,
  ): Promise<void> {
    try {
      const comment = await this.commentService.createComment(
        user,
        createComment,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Comment created successfully',
        comment,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @CommentParamGuard()
  @Put(':commentId/edit')
  async update(
    @Res() res: Response,
    @GetCommentFromParam() comment: CommentDocument,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ): Promise<void> {
    try {
      const updatedComment = await this.commentService.updateComment(
        comment,
        updateCommentDTO,
      );

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Comment updated successfully',
        updatedComment,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @CommentParamGuard()
  @Delete(':commentId/delete')
  async delete(
    @Res() res: Response,
    @GetCommentFromParam() comment: CommentDocument,
  ): Promise<void> {
    try {
      const deleteComment = await this.commentService.deleteComment(comment);

      ResponseService.json(
        res,
        HttpStatus.OK,
        'Comment deleted successfully',
        deleteComment,
      );
    } catch (error) {
      ResponseService.json(res, error);
    }
  }
}
