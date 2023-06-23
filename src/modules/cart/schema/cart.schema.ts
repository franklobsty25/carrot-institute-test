import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { MENU, USER } from 'src/common/constants/schemas';
import { MenuDocument } from 'src/modules/menu/schema/menu.schema';
import { UserDocument } from 'src/modules/user/schema/user.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: SchemaTypes.Number, required: false, default: 1 })
  quantity?: number;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
    default: moment().add(1, 'day').toDate(),
  })
  expires: Date;

  @Prop({type: SchemaTypes.Boolean, required: false, default: false})
  softDelete: boolean;

  // Carts belong to user
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: USER })
  user: UserDocument;

  // Cart belong to menu
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: MENU })
  menu: MenuDocument;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
