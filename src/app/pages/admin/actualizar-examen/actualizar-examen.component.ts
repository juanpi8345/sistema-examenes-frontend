import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent {

  constructor(private activatedRoute:ActivatedRoute, private examenService:ExamenService, private categoriaService:CategoriaService,
    private router:Router ){}

  examenId = 0;
  examen :any;
  categorias:any;

  ngOnInit():void{
    this.examenId = this.activatedRoute.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).subscribe(data=>{
      this.examen = data;
    },err=>console.log(err));

    this.categoriaService.listarCategorias().subscribe(data=>{
      this.categorias = data;
  
    },err=>console.log(err));
  }

  public actualizarCuestionario(){
    this.examenService.actualizarExamen(this.examen).subscribe(data=>{
      Swal.fire("Examen actualizado","Examen actualizado con exito","success").then(e=>this.router.navigate(['/admin/examenes']));
    },err=>console.log(err));
  }

}
