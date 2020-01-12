import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '../model/Task';
import { catchError } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { User } from '../Model/EmployeeData';

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  token: any;
  isLoggedIn: boolean;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
  };
  
  private TaskBaseURL = 'http://localhost:49362/api/Vaules/Tasks';
  private SUPER_USER_ID = 10;


  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService
  ) { 
    this.token = localStorage.getItem("jwt");
  }
 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.TaskBaseURL)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }
  

  getUserTasks(): Observable<Task[]> {
    var user = this.employeeService.getCurrentUser();
    var userId =  user.id.toString()
    const url = `${this.TaskBaseURL}/User${userId}`;
    
    return this.http.get<Task[]>(url)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );   
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.TaskBaseURL}/${id}`;
    return this.http.get<Task>(url, ).pipe(
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  updateTask(employee: Task): Observable<any> {
    return this.http.put(`${this.TaskBaseURL}/${employee.id}`, employee ).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  createTask(employee: Task): Observable<any> {
    return this.http.post<any>(this.TaskBaseURL, employee, {observe: 'response'}).pipe(
      catchError(this.handleError<any>('createTask'))
    );
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.TaskBaseURL}/${id}`;
    return this.http.delete<Task>(url);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

