import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}
  registerUser(item: any) {
    return this._http.post('http://localhost:3000/register', { user: item });
  }
  loginUser(user: any) {
    return this._http.post<any>('http://localhost:3000/login', user);
  }
  resetPassword(user: any) {
    return this._http.post<any>('http://localhost:3000/reset', user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUser() {
    return localStorage.getItem('role');
  }
}
