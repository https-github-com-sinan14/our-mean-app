import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css'],
})
export class StudentRegisterComponent implements OnInit {
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) {}
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  model1: Date;
  genders = ['male', 'female'];

  ngOnInit(): void {
    this.registerForm.patchValue({
      userData: {
        username: 'Anna',
      },
    });
  }
  registerForm = this._fb.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    Phone: ['', [Validators.required, Validators.pattern(this.phoneReg)]],
    Sex: ['', Validators.required],
    DOB: ['', Validators.required],
    Course: ['', Validators.required],
    HighestQualification: ['', Validators.required],
    SkillSet: ['', Validators.required],
    PassOfYear: ['', Validators.required],
    EmploymentStatus: ['', Validators.required],
    State: ['', Validators.required],
    District: ['', Validators.required],
    Post: ['', Validators.required],
    PinCode: ['', [Validators.required, Validators.minLength(6)]],
    Status: ['inactive'],
    // gender: ['male',Validators.required]
  });

  registerStudent() {
    if (this.registerForm.invalid) {
      return;
    }
    this._auth.registerUser(this.registerForm.value).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            title: 'Good Job',
            timer: 1000,
            text: 'successfully registered',
            icon: 'success',
          }).then(() => {
            this.registerForm.reset();
            
          });
        } else {
          Swal.fire({
            title: 'Oops...',
            timer: 1500,
            text: 'Something went wrong!',
            icon: 'error',
          }).then(() => {
            this.registerForm.reset();
          });
        }
      },
      (errorMessage) => {
        Swal.fire({
          title: 'warning!!',
          showConfirmButton: false,
          timer: 1000,
          text: 'some internal error',
          icon: 'error',
        }).then(() => {
          this.registerForm.reset();
        });
      }
    );
  }
}
