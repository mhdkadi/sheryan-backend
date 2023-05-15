import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import * as paginate from "mongoose-paginate-v2";
import { User } from "src/user/schemas/user.schema";

@Schema()
export class PathologicalCase {
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop()
  level: string;

  @Prop()
  name: string;
}

export const PathologicalCaseSchema =
  SchemaFactory.createForClass(PathologicalCase);

PathologicalCaseSchema.plugin(paginate);

export type PathologicalCaseDocument = PathologicalCase & mongoose.Document;
