import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { EmployeeData } from 'src/app/employee/Model/EmployeeData';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']

})
export class MyAccountComponent implements OnInit {

  id: number;
  employee: EmployeeData;
  canShowPAsswordInput = false;
  canShowPasswordMessage = false; 
  passwordChanged = false;
  passwordChangedMessage = "";
  accountForm: FormGroup;


  constructor(
    private activeRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    debugger
    this.getEmployee();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/auth/admin"]);
    }

    this.accountForm = this.formBuilder.group({
      password: ['', Validators.required],
    });

  }

  getEmployee(): void {
    this.id = this.getUserId();
    if(this.id != -1){
      this.employeeService.getEmployee(this.id).subscribe(employee => {
        this.employee = employee;
      });
    }
  }

  singOut(): void {
    this.authService.deleteToken();
    this.router.navigate(["/auth/admin"]);
  }

  resetPassword(): void {
    debugger
    this.employeeService.updateEmployee(this.employee)
      .subscribe(
        suc => {
          this.passwordChanged = true;
          this.canShowPAsswordInput = false;
          this.canShowPasswordMessage = true;
          this.passwordChangedMessage = "successfully changed password"
        },
        err => {
          this.passwordChanged = true;
          this.canShowPAsswordInput = false;
          this.canShowPasswordMessage = true;
          this.passwordChangedMessage = "cannot changed password";

        },
        () => {
          this.accountForm.reset();
        }
      );
  }

  showPasswordInput() {
    if (this.canShowPAsswordInput) {
      this.canShowPAsswordInput = false
    }
    else if(!this.canShowPAsswordInput && this.canShowPasswordMessage) {
      this.canShowPasswordMessage = false;
    }
    else {
      this.canShowPAsswordInput = true;
    }
  }

  navigateToUserDetails(): void {
    var currentUser = this.getUserId();
    if (currentUser && currentUser != -1) {
      var userDetailsURL = `/detail/${currentUser}`
      this.router.navigateByUrl(userDetailsURL);
    }
  }

  getUserId(): number {
    var currentUser =  JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      if(currentUser.id){
        return currentUser.id
      }
    }
    return -1;
  }

  get form() {
    return this.accountForm.controls;
  }

}
