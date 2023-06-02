import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:8080/";

  public generateToken(loginData:any){
    return this.http.post(this.apiUrl + "generate-token",loginData);
  }

  //Inicia sesion y establece el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem("token",token);
  }
  
  public isLoggedIn(): boolean{
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == null || tokenStr == undefined || tokenStr == ''){
      return false;
    }
    return true;
  }

  //Cerrar sesion y eliminar el token
  public logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }


  //obtener token
  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
    }
  }

  public getUserRol(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(this.apiUrl + "actual-usuario");
  }

}
