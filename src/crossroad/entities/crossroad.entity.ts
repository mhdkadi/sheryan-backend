import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";

@Schema()
export class Crossroad {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  trafficLites: any;
}

export const CrossroadSchema = SchemaFactory.createForClass(Crossroad);

CrossroadSchema.plugin(paginate);

export type CrossroadDocument = Crossroad & mongoose.Document;
