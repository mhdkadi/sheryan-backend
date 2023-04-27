import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { log } from 'console';
import { Model } from 'mongoose';
import { CreateTrafficLightDto } from './dto/create-traffic_light.dto';
import {
  TrafficLight,
  TrafficLightDocument,
} from './schemas/traffic_light.schema';

@Injectable()
export class TrafficLightsService {
  constructor(
    @InjectModel(TrafficLight.name)
    private TrafficLightModel: Model<TrafficLightDocument>,
  ) {}
  async create(createCodeDto: CreateTrafficLightDto) {
    try {
      const trafficLight = new this.TrafficLightModel(createCodeDto);
      await trafficLight.save();
    } catch (e) {
      log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
