import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent {

  constructor(private activatedRoute:ActivatedRoute, private preguntaService:PreguntaService, private router:Router){}

  examenId:any;
  titulo:any;

  pregunta:any = {
    examen:{},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta : ''
  }

  ngOnInit():void{
    this.examenId = this.activatedRoute.snapshot.params['examenId'];
    this.pregunta.examen['examenId'] = this.examenId;
    this.titulo = this.activatedRoute.snapshot.params['titulo'];
  }

  formSubmit(){
    if(this.pregunta.contenido.trim() == '' || this.pregunta.contenido == null) return;
    if(this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null) return;
    if(this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null) return;
    if(this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null) return;
    if(this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null) return;
    if(this.pregunta.respuesta.trim() == '' || this.pregunta.respuesta == null) return;
    this.preguntaService.guardarPregunta(this.pregunta).subscribe(data=>{
      Swal.fire("Pregunta agregada","Pregunta agregada con exito!","success");
      this.router.navigate(['/admin/ver-preguntas/ '+this.examenId+ '/' + this.titulo]);
      this.pregunta = { examen:{}, contenido: '',opcion1: '', opcion2: '',opcion3: '',opcion4: '', respuesta : ''}
    },err=>Swal.fire("Error al agregar pregunta","No se pudo agregarr la pregunta","error"));
  }
}
