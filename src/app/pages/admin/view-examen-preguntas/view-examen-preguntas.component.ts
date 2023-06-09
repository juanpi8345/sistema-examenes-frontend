import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent {

  examenId: any;
  titulo: any;

  preguntas: any = [];
  constructor(private activatedRoute: ActivatedRoute, private preguntaService: PreguntaService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.examenId = this.activatedRoute.snapshot.params['examenId'];
    this.titulo = this.activatedRoute.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(data => {
      this.preguntas = data;
      console.log(data);
    })
  }

  eliminarPregunta(id: number) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estas seguro que queres eliminar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.preguntaService.eliminarPregunta(id).subscribe(data => {
          this.snack.open("Pregunta eliminada", "Aceptar", {
            duration: 3000
          });
          this.preguntas = this.preguntas.filter((pregunta: any) => pregunta.preguntaId != id);
        }, err => {
          this.snack.open("Error al guardar pregunta", "Aceptar", {
            duration: 3000
          });
          console.log(err);
        });
      }
    });
  }
}



