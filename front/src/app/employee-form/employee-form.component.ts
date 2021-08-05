import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  isLoading: boolean = false;
  ngOnInit() {
    this.employeeForm.patchValue({
      Password: 'sinan@66A',
      SkillSet: 'Java,Js,C++',
    });
  }

  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;

  constructor(private _auth: AuthService, private _fb: FormBuilder) {}
  employeeForm = this._fb.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    Phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
    Gender: ['Male', [Validators.required]],
    DOB: ['', Validators.required],
    HighestQualification: ['', Validators.required],
    SkillSet: ['HTML,CSS,JS,PYTHON,C#,JAVA'],
    State: ['', Validators.required],
    District: ['', Validators.required],
    Post: ['', Validators.required],
    PinCode: [
      '',
      [Validators.required, Validators.min(100000), Validators.max(999999)],
    ],
    Password: ['Employee@ict21'],
    PassOfYear: [
      '',
      [Validators.required, Validators.min(2000), Validators.max(2020)],
    ],
  });

  registerEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.isLoading = true;
    this._auth.registerEmployee(this.employeeForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        if (response) {
          Swal.fire({
            title: 'Good Job💖💖💖',
            timer: 5000,
            text: 'successfully registered your password \n your password is ',
            icon: 'success',
          }).then(() => {
            this.employeeForm.reset();
          });
        } else {
          Swal.fire({
            title: 'Oops...🤷‍♂️🤷‍♂️',
            timer: 1500,
            text: 'Something went wrong!',
            icon: 'error',
          }).then(() => {
            this.employeeForm.reset();
          });
        }
      },
      (errorMessage) => {
        this.isLoading = false;
        Swal.fire({
          title: 'warning🤦‍♂️🤦‍♂️🤦‍♂️!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          this.ngOnInit();
        });
      }
    );
  }

  //******************************************************************** */
}
