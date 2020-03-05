import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MyTask, TaskStatusNames, TaskStatusValues } from '../model/MyTask';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import * as _ from 'lodash';

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
      this.taskService.getTasks(this.secutiry.isSuperUser()).subscribe(
        result => {
          if(result) {
            this.sortTasksByStatus(result);
            this.MyTasks = result;
            this.MyTasks = this.MyTasks.filter(task => task.status != TaskStatusValues.ENDED);
          }
        });   
  }

  sortTasksByStatus(tasks: MyTask[]) {
    if(tasks && tasks.length > 0){
      var x = _.so
      tasks.sort((a) => 
         a.status
      )
      debugger
      for(let i = 0; i < tasks.length; i++){

      }
    }
  }

  public doneTask(task: MyTask): void{
    if(task){
      task.status = TaskStatusValues.DONE;
      this.taskService.updateTask(task).subscribe(()=>{
        this.removeIfcantEnd(task);
        this.router.navigateByUrl("/Tasks");
      });
    }
  }

  removeIfcantEnd(task: MyTask) {
    if(!this.secutiry.isSuperUser()){
      this.removeFormTaskList(task);
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

  

  goToTaskDetails(id: number){
    var url = `/Tasks/${id}`
    this.router.navigateByUrl(url)
  }
  

  removeFormTaskList(task: MyTask) {
    this.MyTasks.filter(x => x.id != task.id)
    // const index: number = this.MyTasks.indexOf(task);
    // if (index !== -1) {
    //     this.MyTasks.splice(index, 1);
    // }        
  }

  getTaskStatusName(status: number){
    switch(status){
      case TaskStatusValues.NEW: {
        return TaskStatusNames.NEW
      }
      case TaskStatusValues.ASSIGNED: {
        return TaskStatusNames.ASSIGNED
      }
      case TaskStatusValues.DONE: {
        return TaskStatusNames.DONE
      }
      case TaskStatusValues.ENDED: {
        return TaskStatusNames.ENDED
      }
      default :{
        return ""
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
