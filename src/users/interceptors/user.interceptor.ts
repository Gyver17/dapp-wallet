import { Injectable } from '@nestjs/common';
import {
  BaseSerializerInterceptor,
  Serialized,
} from '../../common/interceptors/base-serializer.interceptor';
import { User } from '@prisma/client';

@Injectable()
export class UserSerializerInterceptor extends BaseSerializerInterceptor<
  User,
  unknown
> {
  serialize({ data }: Serialized<User>): unknown {
    return {
      ...data,
      password: undefined,
      privateKey: undefined,
    };
  }
}
