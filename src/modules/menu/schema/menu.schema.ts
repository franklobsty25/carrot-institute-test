import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

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

  @Prop({ type: SchemaTypes.String })
  imageUrl?: string;

  @Prop({ type: SchemaTypes.Number, decimal: 2, required: true })
  price: number;

  @Prop({ type: SchemaTypes.String, required: false })
  description?: string;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
