import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { HospitalService } from "./hospital.service";
import { HospitalController } from "./hospital.controller";
import { Hospital, HospitalSchema } from "./entities/hospital.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hospital.name, schema: HospitalSchema },
    ]),
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
