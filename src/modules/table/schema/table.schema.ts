import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { RESTAURANT } from 'src/common/constants/schemas';
import { RestaurantDocument } from 'src/modules/restaurant/schema/restaurant.schema';

export type TableDocument = Table & Document;

@Schema({ timestamps: true })
export class Table {
  @Prop({ type: SchemaTypes.String, required: false })
  name?: string;

  @Prop({ type: SchemaTypes.Number, required: false })
  quantity?: number;

  @Prop({ type: SchemaTypes.Number, required: false })
  chairs?: number;

  // Table belongs to a restaurant
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: RESTAURANT })
  restaurant: RestaurantDocument | string;
}

export const TableSchema = SchemaFactory.createForClass(Table);
