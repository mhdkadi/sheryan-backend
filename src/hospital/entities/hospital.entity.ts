import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";

@Schema()
export class Hospital {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  type: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    _id: false,
  })
  location: { lat: number; lng: number };
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);

HospitalSchema.plugin(paginate);

export type HospitalDocument = Hospital & mongoose.Document;
