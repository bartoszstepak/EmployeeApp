import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeData } from '../Model/EmployeeData';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-upload-image-employee',
  templateUrl: './upload-image-employee.component.html',
  styleUrls: ['./upload-image-employee.component.css']
})

export class UploadImageEmployeeComponent implements OnInit {

  ngOnInit(): void {
    this.getEmployee();
  }

  fileToUpload: File;
  employee: EmployeeData;
  uploadSubscription: Subscription;
  imgSrc: string;
  img;
  id: number;

  constructor(
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private location: Location

  ) { }

  getEmployee(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(this.id).subscribe(employee => {
      this.employee = employee;
      if (employee.image !== null) {
        this.getEmployImg();
      }
    });
  }


  getEmployImg(): void {
    this.employeeService.getImage(this.id).subscribe(resp => {
      this.img = resp;
      this.imgSrc = "data:image/*;base64," + this.img;
    });
  }


  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);

    const formData: FormData = new FormData();
    formData.append('uploadFile', this.fileToUpload, this.fileToUpload.name);

    this.uploadSubscription = this.employeeService
      .fileUpload(formData, this.employee.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            this.getEmployee();
            alert('photo uploaded');
            this.route.navigate(["/detail/" + this.employee.id]);
          }
        },
        error => { alert(error) });
  }

  goBack(): void {
    this.location.back();
  }

}







