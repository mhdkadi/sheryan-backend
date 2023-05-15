import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";

import { User } from "src/user/schemas/user.schema";

@Schema()
export class Notification {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  })
  user: User | mongoose.Schema.Types.ObjectId | string;

  @Prop()
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.plugin(paginate);

export type NotificationDocument = Notification & mongoose.Document;
