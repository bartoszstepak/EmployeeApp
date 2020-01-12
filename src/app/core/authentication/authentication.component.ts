import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationData } from '../mdoel/AuthenticationData';
import { AuthService } from '../services/auth.service';
import { debug } from 'util';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  login: AuthenticationData;
  profileForm: FormGroup;
  invalidLogin: boolean;
  token: any;
  credentials: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    console.log();
    this.login = new AuthenticationData();
    this.login.login = this.profileForm.value.login;
    this.login.password = this.profileForm.value.password;

    this.credentials = JSON.stringify(this.login)


    this.authservice.singIn(this.credentials).subscribe(response => {

      this.token = response.token;
      if(response.employee)
      {
        var currentUser = JSON.stringify({ login:response.employee.login, id:response.employee.id});
        if(currentUser){
          localStorage.setItem('currentUser', currentUser );
        }
      }

      this.authservice.setToken(this.token);
      this.invalidLogin = false;
      this.router.navigate([""]);
    }, err => {
      this.invalidLogin = true;
    });
  }


  get form() {
    return this.profileForm.controls;
  }
}
