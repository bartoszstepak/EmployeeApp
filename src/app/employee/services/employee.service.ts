import { Injectable, OnInit } from '@angular/core';
import { EmployeeData, User } from '../Model/EmployeeData';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  token: any;
  isLoggedIn: boolean;

  constructor(
    private http: HttpClient,
  ) { 
    this.token = localStorage.getItem("jwt")
  }

  private readonly EmployeesDBUrl = 'http://localhost:49362/api/values';
  private readonly uploadImgDBUrl = 'http://localhost:49362/api/values/upload-image';
  private readonly getImgDBUrl = 'http://localhost:49362/api/values/img';
  private readonly SUPER_USER_ID = 10;

  
  fileUpload(file: FormData, id: number): Observable<HttpEvent<{}>> {
    this.token = localStorage.getItem("jwt")
    const req = new HttpRequest('POST', this.uploadImgDBUrl + '/' + id, file, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  getImage(id: number): Observable<any> {
    const url = `${this.getImgDBUrl}/${id}`;
    return this.http.get(url, );
  }

  getEmployees(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(this.EmployeesDBUrl)
      .pipe(
        catchError(this.handleError<EmployeeData[]>('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<EmployeeData> {
    const url = `${this.EmployeesDBUrl}/${id}`;
    return this.http.get<EmployeeData>(url, ).pipe(
      catchError(this.handleError<EmployeeData>(`getEmployee id=${id}`))
    );
  }

  updateEmployee(employee: EmployeeData): Observable<any> {
    return this.http.put(`${this.EmployeesDBUrl}/${employee.id}`, employee ).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  createEmployee(employee: EmployeeData): Observable<any> {
    return this.http.post<any>(this.EmployeesDBUrl, employee, {observe: 'response'}).pipe(
      catchError(this.handleError<any>('createEmloyee'))
    );
  }



  deleteEmployee(id: number): Observable<EmployeeData> {
    const url = `${this.EmployeesDBUrl}/${id}`;
    return this.http.delete<EmployeeData>(url);
  }

  isSuperUser(): boolean {
    var curenUser = JSON.parse(localStorage.getItem('currentUser'))
    if(curenUser){
      if(curenUser.id){
        return curenUser.id == this.SUPER_USER_ID;
      }
    }
    return false;
  }

  getCurrentUser(): User{
    var curenUser = JSON.parse(localStorage.getItem('currentUser'));
    return new User(curenUser.id, curenUser.Login);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

