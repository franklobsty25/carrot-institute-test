import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { MENU, OrderEnum, USER } from 'src/common/constants/schemas';
import { MenuDocument } from 'src/modules/menu/schema/menu.schema';
import { UserDocument } from 'src/modules/user/schema/user.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: SchemaTypes.Number, required: false, default: 1 })
  quantity?: number;

  @Prop({ type: SchemaTypes.String, required: false, default: OrderEnum.Pending })
  status: string;

  @Prop({ type: SchemaTypes.Boolean, required: false, default: false })
  softDelete: boolean;

  // Order belongs to user
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: USER })
  user: UserDocument;

  // Order belongs to menu
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: MENU })
  menu: MenuDocument;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
