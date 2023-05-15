import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CrossroadService } from "./crossroad.service";
import { CrossroadController } from "./crossroad.controller";
import { Crossroad, CrossroadSchema } from "./entities/crossroad.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Crossroad.name, schema: CrossroadSchema },
    ]),
  ],
  controllers: [CrossroadController],
  providers: [CrossroadService],
})
export class CrossroadModule {}
