import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService :BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    // let username = 'ducnv'
    // let password = '123'
    // let basicAuthenHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthenHeaderString = this.basicAuthenticationService.getAuthenticaterToken();
    let username = this.basicAuthenticationService.getAuthenticaterUser();

    if(basicAuthenHeaderString && username){
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthenHeaderString
        }
      })
    }
    
    return next.handle(request);
  }

}
