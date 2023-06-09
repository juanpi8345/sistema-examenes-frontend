import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent {

  catId: number = 0;
  examenes:any = [];
  constructor(private activatedRoute: ActivatedRoute,private examenService:ExamenService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.catId = params['catId'];
      if (this.catId == 0) {
        this.examenService.obtenerExamenesActivos().subscribe(data=>{
          this.examenes = data;
          console.log(data);
        },err=>console.log(err));
      } else {
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.catId).subscribe(data=>{
          this.examenes = data;
          console.log(data);
        },err=>console.log(err));
        
      }
    })
   

  }
}
