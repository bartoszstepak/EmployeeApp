import { EmployeeData } from '../Model/EmployeeData';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit, OnDestroy {

   employee: EmployeeData;
   getSub: Subscription;
   id: number;
   getImgSubscription: Subscription;
   img;
   imgSrc: string;
   SUPER_USER_ID = 10;
 
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }
 
  ngOnInit(): void {
    this.getEmployee(); 
  }

  ngOnDestroy(): void {
    if(this.getSub) {
      this.getSub.unsubscribe();
    }
  }

  getEmployee(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getSub = this.employeeService.getEmployee(this.id).subscribe(employee => {
      this.employee = employee;
        this.getEmployImg();
      
    });
  }

  getEmployImg(): void {
    this.getImgSubscription = this.employeeService.getImage(this.id).subscribe(resp => {
      this.img = resp;
      this.imgSrc = "data:image/*;base64," + this.img;
    },
    err => {
      console.log('nie ma foty');
    });
  }

  canUpdateData(): boolean{
    var user = this.employeeService.getCurrentUser();
    if(user){
      return this.employeeService.isSuperUser() || this.employee.id == user.id;
    } 
    return false;
  }

  goBack(): void {
    this.location.back();
  }
}
