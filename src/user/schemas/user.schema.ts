import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";

import { Hospital } from "src/hospital/entities/hospital.entity";


@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  phone: string;

  @Prop({ required: false })
  fcmToken?: string;

  @Prop()
  accountType: string;

  @Prop()
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: false,
  })
  hospital?: Hospital | mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  location: { type: "Point"; coordinates: [number, number] };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ location: "2dsphere" });

UserSchema.plugin(paginate);

export type UserDocument = User & mongoose.Document;
