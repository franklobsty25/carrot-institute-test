import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { COMMENT, RESTAURANT } from 'src/common/constants/schemas';
import { CommentDocument } from 'src/modules/comment/schema/comment.schema';
import { RestaurantDocument } from 'src/modules/restaurant/schema/restaurant.schema';

export type MenuDocument = Menu & Document;

@Schema({ timestamps: true })
export class Menu {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  category?: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  ingredients?: string;

  @Prop({ type: SchemaTypes.String })
  imageUrl?: string;

  @Prop({ type: SchemaTypes.Number, decimal: 2, required: true })
  price: number;

  @Prop({ type: SchemaTypes.String, required: false })
  description?: string;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;

  // A menu belongs to a restaurant
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: RESTAURANT })
  restaurant: RestaurantDocument;

  // Comments belongs to menu
  @Prop({ type: [{ type: mongoose.SchemaTypes.ObjectId, ref: COMMENT }] })
  comments: CommentDocument[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
