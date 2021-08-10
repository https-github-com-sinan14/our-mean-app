import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  showLoginButton:boolean;
  
  logoutUser() {
    this._auth.logOut();
  }

  constructor( public _auth:AuthService) {}

  ngOnInit(): void {}
}
