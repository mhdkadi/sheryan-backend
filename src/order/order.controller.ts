import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { FindOrderDto } from "./dto/find-all.dto";

@Controller("order")
@ApiTags("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async create(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.orderService.create(createOrderDto);

    if (result instanceof Error)
      throw new HttpException(result.message, HttpStatus.CONFLICT);

    return result;
  }

  @Get()
  public async findAll(@Query() queryParams: FindOrderDto) {
    const filter: { user?: string; paramedic?: string } = {};

    if (queryParams.user) filter.user = queryParams.user;
    if (queryParams.paramedic) filter.paramedic = queryParams.paramedic;

    return await this.orderService.findAll(
      filter,
      Number(queryParams.page),
      Number(queryParams.limit),
    );
  }

  @Patch(":id")
  public async update(
    @Param("id") _id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    await this.orderService.update(_id, updateOrderDto);

    return "Done";
  }
}
