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
    this._auth.loginUser(this.loginForm.value).subscribe((response) => {
      if (response.status) {
        localStorage.setItem('token', response.token);
        console.log(response.token);
        localStorage.setItem('role', response.role);
        this._router.navigate(['/']);
      } else {
        Swal.fire('Warning!!', 'User not found!', 'error').then((refresh) => {
          window.location.reload();
        });
      }
    });
  }
}
