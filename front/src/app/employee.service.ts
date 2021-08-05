import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient,private _router:Router) {}
  fetchEmployee(id: any) {
    return this._http.get('http://localhost:3000/employee/' + id);
  }

  fetchEmployees() {
    return this._http.get('http://localhost:3000/employee');
  }

  deleteEmployee(id: any) {
    return this._http.delete('http://localhost:3000/employee/' + id).subscribe(
      (studentData) => {
        this._router.navigate([`/employee`]);
      },
      (errorMessage) => {
        Swal.fire('danger!!', 'some internal error', 'error').then(
          (refresh) => {}
        );
      }
    );
  }
  editEmployee(Employee: any, id) {
    console.log('client update');
    return this._http.put(`http://localhost:3000/employee/${id}`, { Employee });
  }

}
