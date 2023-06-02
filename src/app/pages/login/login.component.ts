import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    "username":'',
    "password":''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router){}

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
      this.snack.open("El nombre de usuario es requerido !!",'Aceptar',{
        duration:3000
      });
      return
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open("La clave es requerida !!",'Aceptar',{
        duration:3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe((data:any)=>{
      this.loginService.loginUser(data.token);
      this.loginService.getCurrentUser().subscribe(user=>{
       this.loginService.setUser(user);
       console.log(user);
       if(this.loginService.getUserRol() == "ADMIN"){
        //dashboard admin
        this.router.navigate(['admin']);
        this.loginService.loginStatusSubject.next(true);
       }else if(this.loginService.getUserRol() == "NORMAL"){
        //dashboard user
        this.router.navigate(['user']);
        this.loginService.loginStatusSubject.next(true);
       }else{
        this.loginService.logOut();
       }
      })
    },error=>{
      console.log(error);
      this.snack.open("Credenciales incorrectas!!","Aceptar",{
        duration:3000
      })
    });
  }

}
