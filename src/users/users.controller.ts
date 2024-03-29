import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto';
import { UserResponseType } from './type';
import { ExpressRequest } from './middlewares';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('users/signin')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.usersService.loginUser(loginDto);
    return this.usersService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.buildUserResponse(request.user);
  }
}