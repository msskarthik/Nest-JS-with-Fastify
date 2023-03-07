import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class jwtValidateInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) { }

  intercept(context: ExecutionContext, next: CallHandler,): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const token = authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      if (decoded) return next.handle();
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}