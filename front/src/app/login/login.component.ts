import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = null;
  passwordReg =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  emailReg = /^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}/;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {}
  loginForm = this._fb.group({
    Email: ['', [Validators.pattern(this.emailReg), Validators.required]],
    Password: ['', [Validators.pattern(this.passwordReg), Validators.required]],
  });

  loginUser() {
    if (!this.loginForm) {
      return;
    }
    console.log(this.loginForm);
    this._auth.loginUser(this.loginForm.value).subscribe(
      (response) => {
        if (response.status) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          // console.log(response.id)
          this._router.navigate([`students/${response.id}`]);
        } else {
          Swal.fire().then((refresh) => {
            this.loginForm.reset({
              title: 'warning!!',
              showConfirmButton: false,
              timer: 1000,
              text: 'user not found',
              icon: 'error',
            });
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
          this.loginForm.reset();
        });
      }
    );
  }
}
