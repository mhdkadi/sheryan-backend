import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  public async register(@Body() createUserDto: CreateUserDto) {
    const oldUser = await this.userService.findOne(
      { username: createUserDto.username },
      { username: 0 },
    );
    if (oldUser)
      throw new HttpException("User already exists", HttpStatus.CONFLICT);

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

    const user = await this.userService.create({
      ...createUserDto,
      location: {
        type: "Point",
        coordinates: [createUserDto.location.lng, createUserDto.location.lat],
      },
    });

    // TODO: fix type
    // @ts-ignore
    delete user._doc.password;

    return user;
  }

  @Post("login")
  public async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findOne({
      username: loginDto.username,
    });

    console.log(user);
    if (!user) throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);

    if (await bcrypt.compare(loginDto.password, user.password)) return user;

    throw new HttpException("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
  }

  @Get(":id")
  public async findOne(@Param("id") _id: string) {
    return await this.userService.findOne({ _id }, { password: 0 });
  }

  @Patch(":id")
  public async update(
    @Param("id") _id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);

    const userLocation: {
      location?: { type: string; coordinates: [number, number] };
    } = {};

    if (updateUserDto.location)
      userLocation.location = {
        type: "Point",
        coordinates: [updateUserDto.location.lng, updateUserDto.location.lat],
      };

    const { location, ...updateUserData } = updateUserDto;

    console.log(userLocation);
    await this.userService.update(_id, { ...updateUserData, ...userLocation });

    return "Done";
  }
}
