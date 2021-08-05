import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(): boolean {
    if (
      this._auth.loggedIn() &&
      (this._auth.getUser() == 'admin')
    ) {
      // Swal.fire('Are You Sure').then(() => {});
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'you are not allowed to do that',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        this._router.navigate(['/']);
      });
      return false;
    }
  }
}
