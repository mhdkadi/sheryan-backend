import { Injectable } from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Hospital, HospitalDocument } from "./entities/hospital.entity";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";
import { CreateHospitalDto } from "./dto/create-hospital.dto";

@Injectable()
export class HospitalService {
  constructor(
    @InjectModel(Hospital.name)
    private HospitalModel: PaginateModel<HospitalDocument>,
  ) {}

  public create(createHospitalDto: CreateHospitalDto) {
    const hospital = new this.HospitalModel(createHospitalDto);

    return hospital.save();
  }

  public findOne(
    filter: Partial<Hospital>,
    projection?: Record<string, 0 | 1>,
  ) {
    return this.HospitalModel.findOne(filter, projection);
  }

  public findAll(
    filter: Partial<Hospital>,
    projection?: Record<string, 0 | 1>,
  ) {
    return this.HospitalModel.find(filter, projection);
  }

  public update(_id: string, updateHospitalDto: UpdateHospitalDto) {
    return this.HospitalModel.updateOne({ _id }, updateHospitalDto);
  }

  public remove(_id: string) {
    return this.HospitalModel.deleteOne({ _id });
  }
}
