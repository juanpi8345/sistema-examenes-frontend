import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent {
  constructor(private categoriaService:CategoriaService) {
    
  }

  categorias:any =[

  ]

  ngOnInit(){
    this.categoriaService.listarCategorias().subscribe(data=>{
      this.categorias = data;
      console.log(this.categorias)
    })
  }

  

}
