import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  constructor(private locationSt:LocationStrategy, private preguntaService:PreguntaService,
    private route:ActivatedRoute, private snack:MatSnackBar){}

  examenId:number = 0;
  preguntas:any = [];
  puntosConseguidos:number = 0;
  respuestasCorrectas:number = 0;
  intentos:number = 0;

  esEnviado:boolean = false;
  timer:any;

  ngOnInit(){
    this.prevenirBotonRetroseso();
    this.examenId = this.route.snapshot.params['examenId'];
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(data=>{
      this.preguntas = data;
      this.timer = this.preguntas.length * 2 * 60;
      this.preguntas.forEach((p:any)=>{
        p['respuestaDada'] = '';
      })
      this.iniciarTemporizador();
    },err=>{
      Swal.fire("Error al cargar las preguntas del examen","error");
      console.log(err);
    })
  }

  prevenirBotonRetroseso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null!,location.href);
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title: '¿Quiere enviar el examen?',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Enviar',
      icon:'info'
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.evaluarExamen();
      }
    });
  }

  iniciarTemporizador(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  evaluarExamen(){
    this.preguntaService.evaluarExamen(this.preguntas).subscribe((data:any)=>{
      this.puntosConseguidos = data.puntosMaximos;
      this.respuestasCorrectas = data.respuestasCorrectas;
      this.intentos = data.intentos;
      this.esEnviado = true;
      console.log(data);
    }, err=>console.log(err));
  //   this.esEnviado = true;
  //   this.preguntas.forEach((p:any)=>{
  //     if(p.respuestaDada == p.respuesta){
  //       this.respuestasCorrectas++;
  //       let puntos = this.preguntas[0].examen.puntosMaximos / this.preguntas.length;
  //       this.puntosConseguidos += puntos;
  //     }
  //     if(p.respuestaDada.trim() != ''){
  //       this.intentos++;
  //     }
  // })
}


  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg`;
  }

  imprimirPagina(){
    window.print();
  }

}
