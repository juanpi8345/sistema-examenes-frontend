import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:8080/";

  public listarCategorias(){
    return this.http.get(this.apiUrl + "categoria/");
  }

  public agregarCategoria(categoria:any){
    return this.http.post(this.apiUrl + "categoria/", categoria);
  }
}
