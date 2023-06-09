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

  public agregarExamen(examen:any){
    return this.http.post(this.apiUrl + "examen/",examen);
  }

  public eliminarExamen(id:number){
    return this.http.delete(this.apiUrl + "examen/"+id);
  }

  public obtenerExamen(id:number){
    return this.http.get(this.apiUrl + "examen/"+id);
  }

  public actualizarExamen(examen:any){
    return this.http.put(this.apiUrl + "examen/", examen);
  }

  public listarExamenesDeUnaCategoria(categoriaId:number){
    return this.http.get(this.apiUrl + "examen/categoria/"+categoriaId)
  }

  public obtenerExamenesActivos(){
    return this.http.get(this.apiUrl + "examen/activo");
  }

  public obtenerExamenesActivosDeUnaCategoria(categoriaId:number){
    return this.http.get(this.apiUrl + "examen/categoria/activo/"+categoriaId)
  }
}
