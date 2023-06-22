import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { USER } from 'src/common/constants/schemas';
import { UserDocument } from 'src/modules/user/schema/user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: SchemaTypes.String, required: false })
  comment: string;

  @Prop({ type: SchemaTypes.Number, required: false })
  rate: number;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: USER })
  user: UserDocument;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
