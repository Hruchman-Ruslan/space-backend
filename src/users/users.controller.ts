import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  crateUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}
