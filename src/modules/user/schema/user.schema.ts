import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

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
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    trim: true,
    required: true,
    default: 'user',
  })
  role: string;

  @Prop({ type: SchemaTypes.Boolean, required: true, default: false })
  softDelete: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
