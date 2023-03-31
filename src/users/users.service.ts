import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { log } from 'console';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = new this.UserModel(createUserDto);
      await user.save();
    } catch (e) {
      log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async login(loginDto: LoginDto) {
    try {
      return await this.UserModel.findOne({
        username: loginDto.username,
        password: loginDto.password,
      });
    } catch (e) {
      log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
