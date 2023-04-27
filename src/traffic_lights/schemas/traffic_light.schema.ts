import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Light } from '../dto/create-traffic_light.dto';

@Schema({ versionKey: false })
export class TrafficLight {
  @Prop({ required: true })
  address: string;

  @Prop({
    type: [
      {
        lat: { type: Number },
        lng: { type: Number },
        _id: false,
      },
    ],
    required: true,
  })
  lights: Light[];
}

export const TrafficLightSchema = SchemaFactory.createForClass(TrafficLight);

export type TrafficLightDocument = TrafficLight & mongoose.Document;
