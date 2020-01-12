import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'Employee System API';
  isLogged: boolean;
  SUPER_USER_ID = 10;

  constructor (private auhtService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(this.auhtService.isLoggedIn()){
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
  }

  canAddEmployee(): boolean{
    return this.auhtService.isSuperUser();
  }
  

  singOut(): void {
    this.auhtService.deleteToken();
  }

}
