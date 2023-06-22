import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMENT } from 'src/common/constants/schemas';
import { CommentSchema } from './schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: COMMENT, schema: CommentSchema }]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
