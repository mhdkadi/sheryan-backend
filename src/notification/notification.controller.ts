import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { FindNotificationDto } from "./dto/find-all.dto";

@Controller("notification")
@ApiTags("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  public async findAll(@Query() queryParams: FindNotificationDto) {
    return await this.notificationService.findAll(
      { user: queryParams.user },
      Number(queryParams.page),
      Number(queryParams.limit),
    );
  }

  @Post()
  public async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }
}
