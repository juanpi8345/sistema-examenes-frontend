import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(protected loginService:LoginService){}

  public logOut(){
    this.loginService.logOut();
    window.location.reload();
  }

}
