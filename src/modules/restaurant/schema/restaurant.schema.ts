import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { MENU, TABLE, USER } from 'src/common/constants/schemas';
import { MenuDocument } from 'src/modules/menu/schema/menu.schema';
import { TableDocument } from 'src/modules/table/schema/table.schema';
import { UserDocument } from 'src/modules/user/schema/user.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ type: SchemaTypes.String, trim: true, required: true, unique: true })
  companyName: string;

  @Prop({
    type: SchemaTypes.String,
    trim: true,
    required: false,
    lowercase: true,
    unique: true,
  })
  companyEmail?: string;

  @Prop({ type: SchemaTypes.String, trim: true, required: false })
  address?: string;

  @Prop({ type: SchemaTypes.String, trim: true, required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: SchemaTypes.Number, trim: true, required: false })
  staffs?: number;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  softDelete: boolean;

  // A user owns a restaurant
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: USER })
  user: UserDocument;

  // Menus belongs to a restaurant
  @Prop({ type: [{ type: mongoose.SchemaTypes.ObjectId, ref: MENU }] })
  menus: MenuDocument[];

  // Tables belongs to a restaurant
  @Prop({ type: [{ type: mongoose.SchemaTypes.ObjectId, ref: TABLE }] })
  tables: TableDocument[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
