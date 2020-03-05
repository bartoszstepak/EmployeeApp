import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MyTask, TaskStatusNames } from '../model/MyTask';
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
  
  private TaskBaseURL = 'http://localhost:49362/api/MyTasks';
  private SUPER_USER_ID = 10;


  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService
  ) { 
    this.token = localStorage.getItem("jwt");
  }
 
  getAllTasks(): Observable<MyTask[]> {
    return this.http.get<MyTask[]>(this.TaskBaseURL)
      .pipe(
        catchError(this.handleError<MyTask[]>('getTasks', []))
      );
  }

  getTasks(hasFullAccess: boolean): Observable<MyTask[]>  {
    if( hasFullAccess ) {
      return this.getAllTasks();
    }
    else {
      return this.getUserTasks();
    }
  }

  

  getUserTasks(): Observable<MyTask[]> {
    var user = this.employeeService.getCurrentUser();
    var userId =  user.id.toString()
    const url = `${this.TaskBaseURL}/User/${userId}`;
    
    return this.http.get<MyTask[]>(url)
      .pipe(
        catchError(this.handleError<MyTask[]>('getTasks', []))
      );   
  }

  getTask(id: number): Observable<MyTask> {
    const url = `${this.TaskBaseURL}/${id}`;
    return this.http.get<MyTask>(url, ).pipe(
      catchError(this.handleError<MyTask>(`getTask id=${id}`))
    );
  }

  updateTask(task: MyTask): Observable<any> {
    return this.http.put(`${this.TaskBaseURL}/${task .id}`, task ).pipe(
      catchError(this.handleError<any>('updateTask'))
    );
  }

  createTask(task: MyTask): Observable<any> {
    return this.http.post<any>(this.TaskBaseURL, task, {observe: 'response'}).pipe(
      catchError(this.handleError<any>('createTask'))
    );
  }

  deleteTask(id: number): Observable<MyTask> {
    const url = `${this.TaskBaseURL}/${id}`;
    return this.http.delete<MyTask>(url);
  }

  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

