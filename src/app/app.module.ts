import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employee/employee.module';
import { CoreModule } from './core';
import { AuthService } from './core/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    EmployeeModule,
    CoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
