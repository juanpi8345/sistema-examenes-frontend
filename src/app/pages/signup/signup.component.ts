import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user = {
    username : '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService, private snack:MatSnackBar){}

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null ||
    this.user.password== '' || this.user.password == null ||
    this.user.nombre== '' || this.user.nombre == null || 
    this.user.apellido== '' || this.user.apellido == null||
    this.user.email== '' || this.user.email == null ||
    this.user.telefono== '' || this.user.telefono == null){

      this.snack.open("Datos de registro incompletos","Aceptar",{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.userService.registrarUsuario(this.user).subscribe(data=>{
      console.log(data);
      Swal.fire("Usuario guardado","Usuario registrado con exito en el sistema",
      "success");
    },(err)=>{
      this.snack.open("Ocurrio un error en el sistema","Aceptar",{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
    )

  }

}
