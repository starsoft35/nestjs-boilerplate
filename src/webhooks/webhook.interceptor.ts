import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  constructor(private options) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...', this.options);
    console.log(context.getArgs());
    // console.log(context.getHandler());
    // console.log(Object.keys(context.switchToHttp()));
    // console.log(Object.keys(context.switchToHttp().getResponse()));
    // console.log(context.switchToHttp().getRequest());

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
