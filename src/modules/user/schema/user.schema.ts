import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Role } from 'src/common/constants/schemas';
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

  @Prop({ type: SchemaTypes.String, trim: true, required: false })
  phoneNumber?: string;

  @Prop({ type: SchemaTypes.String, trim: true, required: false })
  address?: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    default: Role.Buyer,
  })
  role: string;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Restaurant' })
  restaurant: RestaurantDocument;
}

export const UserSchema = SchemaFactory.createForClass(User);
