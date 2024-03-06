import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpError } from 'src/helpers';
import { User } from 'src/schemas';
import { CreateUserDto, LoginDto } from './dto';
import { UserResponseType } from './type';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

dotenv.config();

const { JWT_TOKEN } = process.env;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) throw new HttpError('Email is already taken');

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) throw new HttpError('User is not found');

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) throw new HttpError('Incorrect password');

    return user;
  }

  buildUserResponse(user: User): UserResponseType {
    return {
      name: user.name,
      email: user.email,
      token: this.generateJwt(user),
    };
  }

  generateJwt(user: User): string {
    return sign({ email: user.email }, `${JWT_TOKEN}`);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
