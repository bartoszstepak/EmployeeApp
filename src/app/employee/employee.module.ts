import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UploadImageEmployeeComponent } from './upload-image-employee/upload-image-employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { SafePipe } from './pipes/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule, AuthGuard } from '../core';
import { InterceptorService } from './services/interceptor.service';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { TaksDetailsComponent } from './taks-details/taks-details.component' 

@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    UpdateEmployeeComponent,
    CreateEmployeeComponent,
    UploadImageEmployeeComponent,
    SafePipe,
    MyTasksComponent,
    TaksDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeComponent, canActivate: [AuthGuard]
      },{
        path: 'detail/:id',
        component: EmployeeDetailsComponent, canActivate: [AuthGuard]
      },{
        path: 'add',
        component: CreateEmployeeComponent, canActivate: [AuthGuard]
      },{
        path: 'addImage/:id',
        component: UploadImageEmployeeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'update/:id', 
        component: UpdateEmployeeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'Tasks', 
        component: MyTasksComponent, canActivate: [AuthGuard]
      },
      {
        path: 'Tasks/:id',
        component: TaksDetailsComponent, canActivate: [AuthGuard]
      }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],

})
export class EmployeeModule { }
