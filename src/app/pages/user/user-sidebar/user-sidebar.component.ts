import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {

  categorias: any;

  constructor(private categoriaService: CategoriaService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
    }, err => {
      this.snack.open("Error al cargar las categorias", "Aceptar",{
        duration:3000
      })
      console.log(err);
    })
  }

}
