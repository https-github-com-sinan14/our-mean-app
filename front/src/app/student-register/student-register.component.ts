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
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  ngOnInit(): void {}
  registerForm = this._fb.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern(this.emailReg)]],
    Phone: ['', Validators.required,Validators.pattern(this.phoneReg)],
    Sex: ['', Validators.required],
    Course: ['', Validators.required],
    HighestQualification: ['', Validators.required],
    PassOfYear: ['', Validators.required],
    EmploymentStatus: ['', Validators.required],
    State: ['', Validators.required],
    District:['',Validators.required],
    Post:['',Validators.required],
    Password: ['', [Validators.required, Validators.pattern(this.passwordReg)]],
  });

  registerStudent() {
    this._auth.registerUser(this.registerForm.value).subscribe((response) => {
      if (response) {
        Swal.fire('successfully registered').then(() => {
          this._router.navigate(['/login']);
        });
      } else {
        Swal.fire('something went wrong').then(() => {
          window.location.reload();
        });
      }
    });
  }
}
