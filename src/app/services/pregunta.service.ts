import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  private apiUrl = "http://localhost:8080/";

  public listarPreguntasDelExamen(examenId:number){
    return this.http.get(this.apiUrl+ "pregunta/examen/todos/"+examenId);
  }

  public guardarPregunta(pregunta:any){
    return this.http.post(this.apiUrl+ "pregunta/",pregunta);
  }

  public eliminarPregunta(preguntaId:number){
    return this.http.delete(this.apiUrl +"pregunta/"+ preguntaId);
  }

  public actualizarPregunta(pregunta:any){
    return this.http.put(this.apiUrl+ "pregunta/",pregunta);
  }

  public obtenerPregunta(preguntaId:number){
    return this.http.get(this.apiUrl + "pregunta/"+preguntaId);
  }

  public evaluarExamen(preguntas:any){
    return this.http.post(this.apiUrl + "pregunta/evaluar-examen",preguntas);
  }
}

