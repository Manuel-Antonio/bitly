import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN: string = "e1a6dfb80be1206ef7c2a9dcb3a6f5b665fc14ac";
    request = request.clone({ setHeaders: { Authorization: 'Bearer ' + TOKEN } });

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }));
  }
}
