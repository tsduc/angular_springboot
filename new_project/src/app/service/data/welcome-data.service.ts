import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`)
    // console.log("Execute Hello World Bean Service");
  }

  executeHelloWorldServiceWithPravariable(name: string){


    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`,
    // {headers}
    );
    console.log("Execute Hello World Bean Service");
  }

  // createBasicAuthenticationHttpHeader(){
    // let username = 'ducnv'
    // let password = '123'
    // let basicAuthenHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    // return basicAuthenHeaderString;
  // }

}
