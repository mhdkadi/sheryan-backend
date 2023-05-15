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

import { HospitalService } from "./hospital.service";
import { CreateHospitalDto } from "./dto/create-hospital.dto";
import { UpdateHospitalDto } from "./dto/update-hospital.dto";
import { FindHospitalDto } from "./dto/find-all.dto";

@Controller("hospital")
@ApiTags("hospital")
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  public async findAll(@Query() queryParams: FindHospitalDto) {
    return await this.hospitalService.findAll(queryParams);
  }

  @Get(":id")
  public async findOne(@Param("id") _id: string) {
    return await this.hospitalService.findOne({ _id });
  }

  @Post()
  public async create(@Body() createHospitalDto: CreateHospitalDto) {
    return await this.hospitalService.create(createHospitalDto);
  }

  @Patch(":id")
  public async update(
    @Param("id") _id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    await this.hospitalService.update(_id, updateHospitalDto);

    return "Done";
  }

  @Delete(":id")
  public async remove(@Param("id") _id: string) {
    await this.hospitalService.remove(_id);

    return "Done";
  }
}
