import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {
  
  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(userName: string, password: string){
    return this.http.post<any>(
      `${API_URL}/authentication`,{
        userName,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, userName)
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
            return data 
          }
        )
      );
    // console.log("Execute Hello World Bean Service");
  }

  executeAuthenticationService(username: string, password: string){
    let basicAuthenHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthenHeaderString
    })

    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicauth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem(TOKEN, username)
            sessionStorage.setItem(AUTHENTICATED_USER, basicAuthenHeaderString)
            return data 
          }
        )
      );
    // console.log("Execute Hello World Bean Service");
  }

  getAuthenticaterUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticaterToken(){
    if(this.getAuthenticaterUser()){
      return sessionStorage.getItem(TOKEN)
    }
    return null
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER) 
    sessionStorage.removeItem(TOKEN) 
  }

}

export class AuthenticationBean{
  constructor(public message:string){}
}
