import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() addUserDto: AddUserDto): Promise<User> {
    return this.userService.create(addUserDto);
  }

}
