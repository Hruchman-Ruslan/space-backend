import { User } from 'src/schemas';

export type UserResponseType = Omit<User, 'password'>;
