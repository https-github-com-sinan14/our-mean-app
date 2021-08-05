import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private _http: HttpClient,private _router:Router) {}
  fetchStudent(id: any) {
    return this._http.get('http://localhost:3000/students/' + id);
  }

  fetchStudents() {
    return this._http.get('http://localhost:3000/students');
  }

  destroyStudent(id: any) {
    return this._http.delete('http://localhost:3000/students/' + id).subscribe(
      (studentData) => {
        this._router.navigate([`/students`]);
      },
      (errorMessage) => {
        Swal.fire('danger!!', 'some internal error', 'error').then(
          (refresh) => {}
        );
      }
    );
  }
  editStudent(Student: any, id) {
    console.log('client update');
    return this._http.put(`http://localhost:3000/students/${id}`, { Student });
    // .subscribe(data =>{console.log(data)})
  }
}
