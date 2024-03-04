import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/helpers';
import { User } from 'src/schemas';
import { CreateUserDto } from './dto';
import { userResponseType } from './type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) throw new HttpError('Email is already taken');

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  buildUserResponse(user: User): userResponseType {
    return {
      name: user.name,
      email: user.email,
    };
  }
}
