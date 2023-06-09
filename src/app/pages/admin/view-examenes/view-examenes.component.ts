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

  eliminarExamen(id:number){
    Swal.fire({
      title:"Eliminar examen",
      text: "¿Estas seguro de eliminar el examen?",
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.examenService.eliminarExamen(id).subscribe(data=>{
          this.examenes = this.examenes.filter((examen:any)=>examen.examenId != id);
          Swal.fire("Examen eliminado","El examen ha sido eliminado con exito!", "success");
        },err=>{
          console.log(err);
          Swal.fire("Error","Error al eliminar el examen","error");
        });
      }
    })
  }
}
