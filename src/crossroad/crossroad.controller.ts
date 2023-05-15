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

import { CrossroadService } from "./crossroad.service";
import { CreateCrossroadDto } from "./dto/create-crossroad.dto";
import { UpdateCrossroadDto } from "./dto/update-crossroad.dto";
import { FindCrossroadDto } from "./dto/find-all.dto";

@Controller("crossroad")
@ApiTags("crossroad")
export class CrossroadController {
  constructor(private readonly crossroadService: CrossroadService) {}

  @Post()
  public async create(@Body() createCrossroadDto: CreateCrossroadDto) {
    return await this.crossroadService.create(createCrossroadDto);
  }

  @Get()
  public async findAll(@Query() queryParams: FindCrossroadDto) {
    return await this.crossroadService.findAll(
      {},
      Number(queryParams.page),
      Number(queryParams.limit),
    );
  }

  @Patch(":id")
  public async update(
    @Param("id") _id: string,
    @Body() updateCrossroadDto: UpdateCrossroadDto,
  ) {
    await this.crossroadService.update(_id, updateCrossroadDto);

    return "Done";
  }

  @Delete(":id")
  public async remove(@Param("id") _id: string) {
    return await this.crossroadService.remove(_id);
  }
}
