import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  public registrarUsuario(user:any){
    return this.http.post(this.apiUrl+ "usuarios/",user);
  }
}
