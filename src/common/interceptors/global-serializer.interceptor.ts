import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalSerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() === 'http') {
      const statusCode = context.switchToHttp().getResponse().statusCode;
      return next.handle().pipe(
        map(async (data) => {
          return {
            statusCode: statusCode || HttpStatus.OK,
            message: HttpStatus[statusCode] || 'OK',
            data: await data,
          };
        }),
      );
    }
  }
}
