import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from '../Model/EmployeeData';
import { FormBuilder, Validators } from '@angular/forms';
import { NgForm, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})


export class UpdateEmployeeComponent implements OnInit {

  profileForm: FormGroup;
  employee: EmployeeData;
  showPasswordInput = false;
  id: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      login: ['', [Validators.required,Validators.email]]
    });
  }

  getEmployee(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(this.id).subscribe(employee => {
      this.employee = employee;
    });
  }
  
  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.route.navigateByUrl("/detail/" + this.id));
  }

  goBack(): void {
    this.location.back();
  }

  get form() {
    return this.profileForm.controls;
  }
}
