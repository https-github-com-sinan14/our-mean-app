import { AdminDataTableComponent } from './admin-data-table/admin-data-table.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

// import {  DatatableComponent } from './datatable/datatable.component';
import { AllEmployeesComponent} from './All-empleyees/all-employees.component'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentPaymentComponent } from './student-payment/student-payment.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorsComponent } from './Errors/errors.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { ResetEmpPasswordComponent } from './reset-emp-password/reset-emp-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafePipe } from './safe.pipe';
import { NewdatatableComponent } from './newdatatable/newdatatable.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {EmpdashboardComponent} from './empdashboard/empdashboard.component'
@NgModule({
  declarations: [
  LoadingSpinnerComponent,
    AppComponent,
    LoginComponent,
    StudentRegisterComponent,
    NavHeaderComponent,
    HomeComponent,
    FooterComponent,
    StudentProfileComponent,
    SafePipe,
    NewdatatableComponent,
    EmpdashboardComponent,

    AllStudentsComponent,
    AllEmployeesComponent,
    StudentPaymentComponent,
    ResetPasswordComponent,
    EmployeeFormComponent,
    LoginEmployeeComponent,
    ResetEmpPasswordComponent,
    PageNotFoundComponent,
    EmpProfileComponent,
    AdmindashboardComponent,
    AdminDataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
