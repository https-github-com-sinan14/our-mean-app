import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

ngOnInit(){}

  title = 'ProductManagement';
  constructor(public _auth: AuthService, private _router: Router) {}
  logoutUser() {
    localStorage.removeItem('token');
    Swal.fire('we will miss you').then(() => {
      this._router.navigate(['/login']);
    });
  }
  loggedUser() {
    this._router.navigate(['/books']);
  }
}

