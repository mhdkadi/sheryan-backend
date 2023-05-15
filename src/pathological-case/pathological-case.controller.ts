import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { PathologicalCaseService } from "./pathological-case.service";
import { CreatePathologicalCaseDto } from "./dto/create-pathological-case.dto";
import { UpdatePathologicalCaseDto } from "./dto/update-pathological-case.dto";
import { FindPathologicalCaseDto } from "./dto/find-all.dto";

@Controller("pathological-case")
@ApiTags("pathological-case")
export class PathologicalCaseController {
  constructor(
    private readonly pathologicalCaseService: PathologicalCaseService,
  ) {}

  @Post()
  public async create(
    @Body() createPathologicalCaseDto: CreatePathologicalCaseDto,
  ) {
    return await this.pathologicalCaseService.create(createPathologicalCaseDto);
  }

  @Get("/")
  public async findAll(@Query() queryParams: FindPathologicalCaseDto) {
    return await this.pathologicalCaseService.findAll(
      {},
      Number(queryParams.page),
      Number(queryParams.limit),
    );
  }

  @Patch(":id")
  public async update(
    @Param("id") _id: string,
    @Body() updatePathologicalCaseDto: UpdatePathologicalCaseDto,
  ) {
    await this.pathologicalCaseService.update(_id, updatePathologicalCaseDto);

    return "Done";
  }

  @Delete(":id")
  public async remove(@Param("id") _id: string) {
    await this.pathologicalCaseService.remove(_id);

    return "Done";
  }
}
