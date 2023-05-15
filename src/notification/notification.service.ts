import { Injectable } from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as firebaseAdmin from "firebase-admin";

import { CreateNotificationDto } from "./dto/create-notification.dto";
import {
  Notification,
  NotificationDocument,
} from "./entities/notification.entity";
const serviceAccount = require("../../cert/fcm.json");

@Injectable()
export class NotificationService {
  private fcmAdmin: firebaseAdmin.app.App;

  constructor(
    @InjectModel(Notification.name)
    private NotificationModel: PaginateModel<NotificationDocument>,
  ) {
    this.fcmAdmin = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  }

  public create(createNotificationDto: CreateNotificationDto) {
    const notification = new this.NotificationModel(createNotificationDto);

    return notification.save();
  }

  public findAll(filter: Partial<Notification>, page: number, limit: number) {
    return this.NotificationModel.paginate(filter, {
      page,
      limit,
      customLabels: { docs: "notifications", page: "currentPage" },
      sort: { createdAt: -1 },
    });
  }

  public sendMessage(
    message: { title: string; body: string },
    data: Record<string, string>,
    token: string,
    userId: string,
  ) {
    this.fcmAdmin
      .messaging()
      .send({
        notification: message,
        android: { ttl: 60 * 60 * 1000, priority: "high" },
        apns: { payload: { aps: { badge: 1 } } },
        token,
        data,
      })
      .catch((error) => console.log(error));

    this.create({ title: message.title, body: message.body, user: userId });
  }
}
