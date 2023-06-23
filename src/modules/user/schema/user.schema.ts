import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { RESTAURANT, RoleEnum } from 'src/common/constants/schemas';
import { RestaurantDocument } from 'src/modules/restaurant/schema/restaurant.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: SchemaTypes.String,
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
    required: false,
    trim: true,
  })
  otherName?: string;

  @Prop({
    type: SchemaTypes.String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  })
  email: string;

  @Prop({ type: SchemaTypes.String, trim: true, required: true })
  phoneNumber: string;

  @Prop({ type: SchemaTypes.String, trim: true, required: true })
  address: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: RoleEnum.Buyer,
  })
  role: string;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;

  // User has restaurant
  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: RESTAURANT })
  restaurant: RestaurantDocument;

}

export const UserSchema = SchemaFactory.createForClass(User);
