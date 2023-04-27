import { Body, Controller, Post } from '@nestjs/common';
import { CreateTrafficLightDto } from './dto/create-traffic_light.dto';
import { TrafficLightsService } from './traffic_lights.service';

@Controller('trafficLights')
export class TrafficLightsController {
  constructor(private readonly trafficLightsService: TrafficLightsService) {}

  @Post()
  async createTrafficLight(
    @Body() createTrafficLightDto: CreateTrafficLightDto,
  ) {
    const res = await this.trafficLightsService.create(createTrafficLightDto);
    return res;
  }
}
