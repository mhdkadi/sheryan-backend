import { Injectable } from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { CreateCrossroadDto } from "./dto/create-crossroad.dto";
import { UpdateCrossroadDto } from "./dto/update-crossroad.dto";
import { Crossroad, CrossroadDocument } from "./entities/crossroad.entity";

@Injectable()
export class CrossroadService {
  constructor(
    @InjectModel(Crossroad.name)
    private CrossroadModel: PaginateModel<CrossroadDocument>,
  ) {}

  public create(createCrossroadDto: CreateCrossroadDto) {
    const crossroad = new this.CrossroadModel(createCrossroadDto);

    return crossroad.save();
  }

  public findAll(filter: Partial<Crossroad>, page: number, limit: number) {
    return this.CrossroadModel.paginate(filter, {
      page,
      limit,
      customLabels: { docs: "Crossroads", page: "currentPage" },
    });
  }

  public update(_id: string, updateCrossroadDto: UpdateCrossroadDto) {
    return this.CrossroadModel.updateOne({ _id }, updateCrossroadDto);
  }

  public remove(_id: string) {
    return this.CrossroadModel.deleteOne({ _id });
  }
}
