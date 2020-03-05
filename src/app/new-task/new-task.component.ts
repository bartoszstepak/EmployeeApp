import { Component, OnInit } from '@angular/core';
import { MyTask, TaskStatusNames, TaskStatusValues } from '../employee/model/MyTask';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../employee/services/task.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee/services/employee.service';
import { EmployeeData } from '../employee/Model/EmployeeData';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task: MyTask;
  employees: EmployeeData[];
  createTaskSub: Subscription;
  profileForm: FormGroup;
  invalidEmail: boolean;
  assignetTofromSelectOptions: number;


  constructor(
    private location: Location,
    private taskService: TaskService,
    private security: AuthService,
    private employeeService: EmployeeService,
    private route: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.employeeService.getEmployees().subscribe(result => {
      if(result){
        this.employees = result;
      }
    });


    this.invalidEmail = false;
    this.profileForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: [''],
      assignedTo: ['']
    });
  }

  ngOnDestroy(): void {
    if(this.createTaskSub) {
      this.createTaskSub.unsubscribe();
    }
  }


  onSubmit() {
    this.task = new MyTask();
    this.task.createdBy = this.employeeService.getCurrentUser().id;
    this.task.status = TaskStatusValues.ASSIGNED;
    this.task.title = this.profileForm.value.title;
    this.task.content = this.profileForm.value.content;
    this.task.assignedTo = this.assignetTofromSelectOptions;


    this.createTaskSub = this.taskService.createTask(this.task).subscribe(
      response => {
        debugger
        console.log(response.status) 
         alert("task added");
         if(response.body.id){
          this.route.navigateByUrl(`/Tasks/${response.body.id}`);

         }
          else {
            this.route.navigateByUrl(`/Tasks`);
          }
        },
       error => {
         alert(error);
         this.route.navigateByUrl('/add');
       }
      );
  }

  selectOption(id: number){
    if(id){
      this.assignetTofromSelectOptions = id;
    }
    else{
      this.assignetTofromSelectOptions = 10;
    }
  }
    


  back(): void {
    this.location.back();
  }

  get form() {
    return this.profileForm.controls;
  }
}
