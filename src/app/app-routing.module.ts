import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core';
import { EmployeeModule } from './employee/employee.module';

const routes: Routes = [];

@NgModule({
 exports: [RouterModule],
 imports: [
   CoreModule,
   EmployeeModule,
   RouterModule.forRoot(routes),   
],
 providers: [],
})

export class AppRoutingModule {  
}
