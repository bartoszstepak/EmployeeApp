import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  
  token: any;

  constructor() { }

  intercept(request, next){
    this.token = localStorage.getItem("jwt");
    let tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.token
      }
    });
    return next.handle(tokenizedRequest);
  }
  
}
