import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MyTask, TaskStatus, TaskStatusValues } from '../model/MyTask';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  MyTasks: MyTask[];
  doneStatus = TaskStatusValues.DONE;
  endStatus = TaskStatusValues.ENDED;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private location: Location,
    private secutiry: AuthService 
  ) { }

  ngOnInit() {
    this.getTaks()
  }

  getTaks(): void {
    if(this.secutiry.isSuperUser()){
      this.taskService.getTasks().subscribe(
        result => {
          if(result) {
            this.MyTasks = result;
          }
        }
      );
    }
    else{
      this.taskService.getUserTasks().subscribe(result => {
        if(result) {
          this.MyTasks = result;
        }
      },
      error => {
        console.error("error when getting user tasks");
      }     
      );
    } 
   
  }

  public doneTask(task: MyTask): void{
    if(task){
      task.status = TaskStatusValues.DONE;
      this.taskService.updateTask(task).subscribe(()=>{
        this.removeFormTaskList(task);
        this.router.navigateByUrl("/Tasks");
      });
    }
  }

  public endTask(task: MyTask): void{
    if(task){
      task.status = TaskStatusValues.ENDED;
      this.taskService.updateTask(task).subscribe(()=>{
        this.removeFormTaskList(task);
        this.router.navigateByUrl("/Tasks");
      });
    }
  }

  getTaskStatusName(status: number){
    switch(status){
      case 1: {
        return TaskStatus.NEW
      }
      case 2: {
        return TaskStatus.ASSIGNED
      }
      case 3: {
        return TaskStatus.DONE
      }
      case 4: {
        return TaskStatus.ENDED
      }
      default :{
        return ""
      }
    }
  }

  goToTaskDetails(id: number){
    var url = `/Tasks/${id}`
    this.router.navigateByUrl(url)
  }
  

  removeFormTaskList(task: MyTask) {
    const index: number = this.MyTasks.indexOf(task);
    if (index !== -1) {
        this.MyTasks.splice(index, 1);
    }        
  }

  goBack(): void {
    this.location.back();
  }

}
