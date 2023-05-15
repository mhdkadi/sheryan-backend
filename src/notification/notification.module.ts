import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import {
  NotificationSchema,
  Notification,
} from "./entities/notification.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
