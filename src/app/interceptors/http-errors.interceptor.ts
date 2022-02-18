import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

//create Injectable service and export class HttpErrorsInterceptor ... and an empty constructor
@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  // on all interceptors we need to implement the intercept method from our http interceptor interface
  // intercept method requires two parameters: request and HttpHandler
  // it's going to return observable of http event (this is gonna be of "any" type)
  // we want to return of next (which is a handler for our request) with a method of handle and
  // we want to call a "pipe" which is going to catch an error
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        return observableThrowError(err);
      })
    )
  }
}


