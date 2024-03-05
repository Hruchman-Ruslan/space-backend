import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto';
import { UserResponseType } from './type';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('users/login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.usersService.loginUser(loginDto);
    return this.usersService.buildUserResponse(user);
  }
}
