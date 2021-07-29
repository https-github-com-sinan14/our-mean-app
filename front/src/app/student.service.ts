import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  constructor(private _http: HttpClient) {}
  fetchStudent(id: any) {
    return this._http.get('http://localhost:3000/students/' + id);
  }
  fetchStudents() {
    return this._http.get('http://localhost:3000/students');
  }

  destroyStudent(id: any) {
    return this._http.delete('http://localhost:3000/students/' + id);
  }
  editStudent(student: any) {
    console.log('client update');
    return this._http.put('http://localhost:3000/students/', student);
    // .subscribe(data =>{console.log(data)})
  }

  newStudent(item: any) {
    return this._http
      .post('http://localhost:3000/insert', { student: item })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
