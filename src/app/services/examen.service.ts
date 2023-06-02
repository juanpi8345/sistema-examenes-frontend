import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(this.apiUrl + "examen/")
  }
}
