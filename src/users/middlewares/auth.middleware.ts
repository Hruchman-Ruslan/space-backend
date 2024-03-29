import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from 'src/schemas';
import { UsersService } from '../users.service';

dotenv.config();

const { JWT_TOKEN } = process.env;

export interface ExpressRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];

    try {
      const decode = verify(token, `${JWT_TOKEN}`) as { email: string };
      const user = await this.usersService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
