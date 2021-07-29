import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css'],
})
export class StudentPaymentComponent implements OnInit {
  id: string;
  Student = {
    Status: 'Active',
  };
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['_id'];
  }
  editProfile(item: any) {
    return this._http.put(`http://localhost:3000/students/${this.id}`, {
      Student: item,
    });
  }
  updateProfile() {
    this.editProfile(this.Student).subscribe(
      (data) => {
        console.log(data);
        this._router.navigate([`/students/${this.id}`]);
      },
      (errorMessage) => {
        Swal.fire({
          title: 'Warning!!',
          text: 'Internal server Error',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        }).then((refresh) => {});
      }
    );
  }
}
