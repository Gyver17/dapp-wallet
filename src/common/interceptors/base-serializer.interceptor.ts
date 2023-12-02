import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface Serialized<T> {
  data: T;
  request: Request;
}

export abstract class BaseSerializerInterceptor<T, R>
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() === 'http') {
      const handler = context.getHandler().name;
      const request: Request = context.switchToHttp().getRequest();

      if (handler.startsWith('findAll')) {
        return next.handle().pipe(
          map(async (data) => {
            return await this.serializeMany(data, request);
          }),
        );
      }

      //   if (handler.startsWith('paginate')) {
      //     return next.handle().pipe(
      //       map(async (data) => {
      //         return await this.serializePaginated(
      //           data.results,
      //           data.pagination,
      //           request,
      //         );
      //       }),
      //     );
      //   }

      return next.handle().pipe(
        map(async (data) => {
          return await this.serialize({ data, request });
        }),
      );
    }
  }

  abstract serialize(data: Serialized<T>): Promise<R> | R;

  private async serializeMany(data: T[], request: Request) {
    return await Promise.all(
      data.map((item) => this.serialize({ data: item, request })),
    );
  }

  //   private *chunks<T>(arr: T[], n: number): Generator<T[], void> {
  //     for (let i = 0; i < arr.length; i += n) {
  //       yield arr.slice(i, i + n);
  //     }
  //   }

  //   private async serializePaginated(
  //     data: T[],
  //     pagination: Pagination,
  //     request: Request,
  //   ) {
  //     const maped = await this.serializeMany(data, request);

  //     return {
  //       results: [...this.chunks(maped, pagination.perPage)][pagination.page - 1],
  //       pagination,
  //     };
  //   }
}
