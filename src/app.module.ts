import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CrossroadModule } from "./crossroad/crossroad.module";
import { HospitalModule } from "./hospital/hospital.module";
import { NotificationModule } from "./notification/notification.module";
import { OrderModule } from "./order/order.module";
import { PathologicalCaseModule } from "./pathological-case/pathological-case.module";
import { HttpExceptionFilter } from "./shared/http-exception.filter";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(`${process.env.MONGODB_CONNECTION_STRING}`),
    MongooseModule.forRoot(
      "mongodb+srv://sheryan:sheryan@sheryan.piccwzz.mongodb.net/?retryWrites=true&w=majority",
    ),
    UserModule,
    HospitalModule,
    NotificationModule,
    PathologicalCaseModule,
    CrossroadModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
