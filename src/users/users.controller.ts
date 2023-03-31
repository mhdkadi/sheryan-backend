import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { log } from 'console';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    log(createUserDto.username);
    log(createUserDto.password);
    const res = await this.usersService.createUser(createUserDto);
    return res;
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    log(loginDto.username);
    log(loginDto.password);
    const user = await this.usersService.login(loginDto);
    if (user == null) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      id: 'asdasd',
      address: user.address,
      phone: user.phone,
      username: user.username,
    };
  }
}
