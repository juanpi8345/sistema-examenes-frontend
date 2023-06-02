import { Component } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent {

  examenes : any = [

  ];

  constructor(private examenService:ExamenService) {}

  ngOnInit(){
    this.examenService.listarCuestionarios().subscribe(data=>{
      this.examenes = data;
    },()=>Swal.fire("Error", "Error al cargar los examenes","error"));
  }



}
