import { User } from 'src/schemas';

export type userResponseType = Omit<User, 'password'>;
