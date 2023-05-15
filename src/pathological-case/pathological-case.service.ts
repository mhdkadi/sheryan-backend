import { Injectable } from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { CreatePathologicalCaseDto } from "./dto/create-pathological-case.dto";
import { UpdatePathologicalCaseDto } from "./dto/update-pathological-case.dto";
import {
  PathologicalCase,
  PathologicalCaseDocument,
} from "./entities/pathological-case.entity";

@Injectable()
export class PathologicalCaseService {
  constructor(
    @InjectModel(PathologicalCase.name)
    private PathologicalCaseModel: PaginateModel<PathologicalCaseDocument>,
  ) {}

  public create(createPathologicalCaseDto: CreatePathologicalCaseDto) {
    const pathologicalCase = new this.PathologicalCaseModel(
      createPathologicalCaseDto,
    );

    return pathologicalCase.save();
  }

  public findAll(
    filter: Partial<PathologicalCase>,
    page: number,
    limit: number,
  ) {
    console.log(filter);
    return this.PathologicalCaseModel.paginate(filter, {
      page,
      limit,
      customLabels: { docs: "pathologicalCases", page: "currentPage" },
    });
  }

  public update(
    _id: string,
    updatePathologicalCaseDto: UpdatePathologicalCaseDto,
  ) {
    return this.PathologicalCaseModel.updateOne(
      { _id },
      updatePathologicalCaseDto,
    );
  }

  public remove(_id: string) {
    return this.PathologicalCaseModel.deleteOne({ _id });
  }
}
