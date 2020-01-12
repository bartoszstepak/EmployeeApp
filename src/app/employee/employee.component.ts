
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeData, User } from '../employee/Model/EmployeeData';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  
  employees: EmployeeData[];
  getSub: Subscription;
  deleteSub: Subscription;
  selectedEmplloyee: EmployeeData;
  user: User;

  constructor(
    private employeeService: EmployeeService,
    private route: Router
    ) { }


  ngOnInit() {
    this.getEmployees();
    this.user = this.employeeService.getCurrentUser();
  }

  ngOnDestroy(): void {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

  onSelect(employee: EmployeeData) {
    this.selectedEmplloyee = employee;
  }
  
  delete(employee: EmployeeData): void {
     this.deleteSub = this.employeeService.deleteEmployee(employee.id).subscribe(res => {
      alert("employee deleted");
      this.getEmployees();
    });
  }

  isSuperUser(): boolean{
    return this.employeeService.isSuperUser();
  }


  getEmployees(): void {
    this.getSub = this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
      });
  }
}
