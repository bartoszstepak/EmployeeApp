import { Component, OnInit } from '@angular/core';
import { MyTask, TaskStatusValues } from '../model/MyTask';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeData } from '../Model/EmployeeData';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-taks-details',
  templateUrl: './taks-details.component.html',
  styleUrls: ['./taks-details.component.css']
})
export class TaksDetailsComponent implements OnInit {

  Task: MyTask;
  taskCreator: EmployeeData;
  cueenrtUserAsEmplyee: EmployeeData;
  taskId: number;
  taskStataus: TaskStatusValues;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private security: AuthService

  ) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    this.taskService.getTask(this.taskId).subscribe(result => {
      this.Task = result;
      this.employeeService.getEmployee(this.Task.createdBy).subscribe(res=>{
        if(res){
          this.taskCreator = res;
        }
      });
      this.employeeService.getEmployee(this.Task.assignedTo).subscribe(res=>{
        if(res){
          this.cueenrtUserAsEmplyee = res;
        }
      });
    });
  }

  public doneTask(task: MyTask): void{
    debugger
    if(task){
      task.status = TaskStatusValues.DONE;
      this.taskService.updateTask(task).subscribe(()=>{
        this.router.navigateByUrl("/Tasks");
      });
    }
  }



  public endTask(task: MyTask): void{
    if(task){
      task.status = TaskStatusValues.ENDED;
      this.taskService.updateTask(task).subscribe(()=>{
        this.router.navigateByUrl("/Tasks");
      });
    }
  }

  

  goToTaskDetails(id: number){
    var url = `/Tasks/${id}`
    this.router.navigateByUrl(url)
  }

  isTaskDone(task: MyTask): boolean{
    return task.status == TaskStatusValues.DONE;
  }

  isTaskEnded(task: MyTask): boolean{
    return task.status == TaskStatusValues.ENDED;
  }
  

}
