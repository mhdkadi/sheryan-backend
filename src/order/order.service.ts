import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";

import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order, OrderDocument } from "./entities/order.entity";
import { NotificationService } from "src/notification/notification.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private OrderModel: PaginateModel<OrderDocument>,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {}

  public async create(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(
      { _id: createOrderDto.user },
      { _id: 1, fcmToken: 1, fullName: 1 },
    );

    if (!user) return new Error("User not found");

    const paramedic = await this.userService.findOne(
      {
        accountType: "paramedic",
        status: "online",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                createOrderDto.location.lng,
                createOrderDto.location.lat,
              ],
            },
            $maxDistance: 2 * 1000, // * distance is in meters
          },
        },
      },
      { _id: 1 },
    );

    if (!paramedic) return new Error("Paramedic not found");

    const order = new this.OrderModel(createOrderDto);

    order.paramedic = paramedic._id;
    order.createdAt = new Date();

    const savedOrder = await order.save();

    this.notificationService.sendMessage(
      { title: "New Order", body: "there is a new order" },
      { orderId: order._id.toString() },
      user.fcmToken || "",
      user._id,
    );

    return savedOrder;
  }

  public findAll(filter: Partial<Order>, page: number, limit: number) {
    return this.OrderModel.paginate(filter, {
      page,
      limit,
      customLabels: { docs: "orders", page: "currentPage" },
      sort: { createdAt: -1 },
    });
  }

  public update(_id: string, updateOrderDto: UpdateOrderDto) {
    return this.OrderModel.updateOne({ _id }, updateOrderDto);
  }
}
