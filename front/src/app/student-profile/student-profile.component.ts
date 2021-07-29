import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  id: string;

  Student = {
    _id: '',
    Name: '',
    Email: '',
    Phone: '',
    State: '',
    HighestQualification: '',
    PassOfYear: '',
    SkillSet: '',
    EmploymentStatus: '',
    Course: '',
    DOB: '',
    Password: '',
  };

  constructor(
    private _http: HttpClient,
    private _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  readonly: boolean = true;
  update() {
    this.readonly = !this.readonly;
  }
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['_id'];
    // console.log(`param is ${this.id}`);
    // the id is the one we specified in our routing module
    this.getStudentById().subscribe(
      (studentData: any) => {
        console.log(studentData);
        if (studentData.error) {
          this._router.navigate(['/error'], { state: studentData });
        }

        this.Student = JSON.parse(JSON.stringify(studentData));
        // console.log(this.Student)
      },
      (errorMessage) => {
        this._router.navigate([`/students`]);
        Swal.fire('danger!!', 'some internal error', 'error');
        // .then(
        //   (refresh) => {
        //     this._router.navigate([`/students`]);
        //   }
        // );
      }
    );
  }
  editProfile(item: any) {
    return this._http.put(
      `http://localhost:3000/students/${this.Student._id}`,
      {
        Student: item,
      }
    );
  }
  updateProfile() {
    this.editProfile(this.Student).subscribe(
      (studentData: any) => {
        if (studentData.error) {
          Swal.fire({
            title: 'warning!!',
            text: 'something went wrong',
            icon: 'error',
            timer: 500,
            showConfirmButton: false,
          }).then((refresh) => {
            this.readonly = !this.readonly;
            this._router.navigate(['/error'], { state: studentData });
          });
        }
        Swal.fire({
          title: 'Good Job!!',
          text: 'profile updated successfully',
          icon: 'success',
          timer: 500,
          showConfirmButton: false,
        }).then((refresh) => {
          this.Student = JSON.parse(JSON.stringify(studentData));
          this.readonly = !this.readonly;
          // window.location.reload();
        });


      },
      (errorMessage) => {
        Swal.fire({
          title: 'danger!!',
          text: 'some internal error',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false,
        }).then((refresh) => {
          this.readonly = !this.readonly;
        });
      }
    );
  }

  discard() {
    this.readonly = !this.readonly;
    window.location.reload();
  }
  getStudentById() {
    return this._http.get<any>(`http://localhost:3000/students/${this.id}`);
  }

  deleteProfile() {
    return this._http
      .delete(`http://localhost:3000/students/${this.Student._id}`)
      .subscribe(
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
}
