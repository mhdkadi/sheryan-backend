import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: number;

    if (exception instanceof HttpException) status = exception.getStatus();
    else status = HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message
          : "Internal server error",
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR)
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        "ExceptionFilter",
      );
    else
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        "ExceptionFilter",
      );

    response.status(status).json(errorResponse);
  }
}
