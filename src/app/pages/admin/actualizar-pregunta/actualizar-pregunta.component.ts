import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent {

  preguntaId:number = 0;
  pregunta:any;
  examen:any;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private preguntaService:PreguntaService) {}

  ngOnInit():void{
    this.preguntaId = this.activatedRoute.snapshot.params['preguntaId'];
    this.preguntaService.obtenerPregunta(this.preguntaId).subscribe(data=>{
      this.pregunta = data;
    },err=>console.log(err));
  }

  public actualizarDatosPregunta(){
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(data=>{
      Swal.fire("Pregunta actualizada","La pregunta fue actualizada con exito!","success").then(e=>{
        this.router.navigate(['/admin/ver-preguntas/'+this.pregunta.examen.examenId+'/'+this.pregunta.examen.titulo]);
      });
    })
  }

}
