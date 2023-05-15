import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";

import { User } from "src/user/schemas/user.schema";

@Schema()
export class Order {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop()
  level: string;

  @Prop()
  status: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    _id: false,
  })
  location: { lat: number; lng: number };

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  paramedic: User | mongoose.Schema.Types.ObjectId | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  user: User | mongoose.Schema.Types.ObjectId | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "pathologicalCase",
  })
  pathologicalCase: User | mongoose.Schema.Types.ObjectId | string;

  @Prop()
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.plugin(paginate);

export type OrderDocument = Order & mongoose.Document;
