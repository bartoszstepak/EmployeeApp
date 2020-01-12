import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeeData } from '../Model/EmployeeData';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  

  employee: EmployeeData;
  createSub: Subscription;
  profileForm: FormGroup;
  invalidEmail: boolean;

  @Input() objemp: EmployeeData = new EmployeeData();;

  constructor(
    private location: Location,
    private employeeService: EmployeeService,
    private route: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.invalidEmail = false;
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      login: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if(this.createSub) {
      this.createSub.unsubscribe();
    }
  }


  onSubmit() {
    this.employee = new EmployeeData();
    this.employee.firstName = this.profileForm.value.firstName;
    this.employee.secondName = this.profileForm.value.secondName;
    this.employee.login = this.profileForm.value.login;
    this.employee.password = this.profileForm.value.password;

    this.createSub = this.employeeService.createEmployee(this.employee).subscribe (response => {
       console.log(response.status) 
        alert("employee added");
        this.route.navigateByUrl('/');
       },
      error => {
        alert(error);
        this.route.navigateByUrl('/add');
      });
  }


  back(): void {
    this.location.back();
  }

  get form() {
    return this.profileForm.controls;
  }
}
