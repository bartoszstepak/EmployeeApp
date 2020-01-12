import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthGuard } from '../core';
import { CreateAdminAccountComponent } from './create-admin-account/create-admin-account.component';
@NgModule({
  declarations: [
    AuthenticationComponent,
    MyAccountComponent,
    CreateAdminAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forChild([
      { 
        path: 'auth/admin',
         component: AuthenticationComponent
        }, 
        {
          path:'myAccount',
          component: MyAccountComponent
        }
      ])

  ],
  exports: [
    AuthenticationComponent
  ],
  
  
})
export class CoreModule { 
  //static forroot
}
