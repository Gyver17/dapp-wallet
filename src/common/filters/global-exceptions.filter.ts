import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    // console.log(exception);

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const exceptionResponse = exception.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      name: exception.name || 'Error',
      statusCode: httpStatus,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
      // stack: exception.stack,
    };

    if (typeof exceptionResponse === 'string') {
      responseBody.message = exceptionResponse;

      response.status(httpStatus).json({
        errors: [responseBody],
      });
      return;
    }

    responseBody.message = exceptionResponse['message'];
    responseBody.name = exceptionResponse['error'];

    response.status(httpStatus).json({ errors: [responseBody] });
  }
}
