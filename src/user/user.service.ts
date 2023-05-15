import { Injectable } from "@nestjs/common";
import { FilterQuery, PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: PaginateModel<UserDocument>,
  ) {}

  public create(
    createUserDto: Omit<CreateUserDto, "location"> & {
      location: { type: string; coordinates: [number, number] };
    },
  ) {
    const user = new this.UserModel(createUserDto);
    console.log("user", user);

    return user.save();
  }

  public findOne(
    filter: FilterQuery<UserDocument>,
    projection?: Record<string, 0 | 1>,
  ) {
    return this.UserModel.findOne(filter, projection);
  }

  public update(
    _id: string,
    updateUserDto: Omit<UpdateUserDto, "location"> & {
      location?: { type: string; coordinates: [number, number] };
    },
  ) {
    return this.UserModel.updateOne({ _id }, updateUserDto);
  }
}
