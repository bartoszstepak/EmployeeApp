import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
  };
  constructor(
    private http: HttpClient
  ) {}

  private loginUrl = "http://localhost:49362/api/loginController/login"
  private SUPER_USER_ID = 10;

  getToken() {
    return localStorage.getItem("jwt")
  }

  setToken(token) {
    localStorage.setItem("jwt", token);
  }

  singIn(credentials): Observable<any> {
    return this.http.post(this.loginUrl, credentials, this.httpOptions );
  }
  deleteToken() {
    localStorage.clear();
  }

  isSuperUser(){
    var userIdFormStrage = JSON.parse(localStorage.getItem('currentUser'));
    if(userIdFormStrage){
      if( userIdFormStrage.id){
        return Number(userIdFormStrage.id) == this.SUPER_USER_ID;
      }
    }
    return false;
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

}
