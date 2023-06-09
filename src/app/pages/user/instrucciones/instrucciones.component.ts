import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent {

  constructor(private examenService:ExamenService, private route:ActivatedRoute, private router:Router){}

  examenId:number = 0;
  examen:any = [];

  ngOnInit():void{
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe(data=>{
      console.log(data);
      this.examen = data;
    },err=>console.log(err))

  }

  empezarExamen(){
    Swal.fire({
      title:"¿Quiere empezar el examen?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText:"Empezar",
      icon:"info"
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.router.navigate(['/user/start/'+this.examenId]);
      }
    })
  }

}
