import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrafficLight,
  TrafficLightSchema,
} from './schemas/traffic_light.schema';
import { TrafficLightsController } from './traffic_lights.controller';
import { TrafficLightsService } from './traffic_lights.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrafficLight.name, schema: TrafficLightSchema },
    ]),
  ],
  controllers: [TrafficLightsController],
  providers: [TrafficLightsService],
})
export class TrafficLightsModule {}
