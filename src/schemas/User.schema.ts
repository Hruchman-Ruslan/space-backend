import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createHash } from 'crypto';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  try {
    const hash = createHash('sha256');
    hash.update(this.password);
    this.password = hash.digest('hex');
    next();
  } catch (error) {
    next(error);
  }
});
