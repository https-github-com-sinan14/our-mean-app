import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn() && this._auth.getUser() == 'admin') {
      console.log('true');
      Swal.fire('Are You Sure').then(() => {});
      return true;
    } else {
      localStorage.removeItem('token');
      Swal.fire('you have no admin privilage').then(() => {
        this._router.navigate(['/login']);
      });
      return false;
    }
  }
}
