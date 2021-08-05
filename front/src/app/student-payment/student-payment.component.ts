import { StudentServiceService } from './../student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css'],
})
export class StudentPaymentComponent implements OnInit {
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  paymentForm: FormGroup;

  isValid(controlName) {
    return (
      this.paymentForm.get(controlName).invalid &&
      this.paymentForm.get(controlName).touched
    );
  }

  onSubmit() {
    if (!this.paymentForm.valid) {
      return;
    }
  }

  //****************************************** */
  id: string;
  fee: number;
  elevatedFee: number;
  studentFee: number;
  womenFee: number;
  studentId: string;
  courseFee = {
    MeanStack: 21000,
    CyberSecurity: 24000,
    DataScience: 30000,
    Robotics: 25000,
    DigitalMarketing: 20000,
  };
  Student = {
    _id: '',
    Name: '',
    Email: '',
    Course: '',
    State: '',
    Post: '',
    District: '',
    Sex: '',
    EmploymentStatus: '',
    Status: 'Active',
    PaymentDate: new Date(),
  };
  constructor(
    private _StudentService: StudentServiceService,
    private _router: Router,
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute
  ) {}

  editProfile(studentPaymentInfo) {
    return this._http.put(`http://localhost:3000/students/${this.id}/pay`, {
      Student: {
        Course: `${this.Student.Course}`,
        Email: `${this.Student.Email}`,
        Status: 'Active',
        PaymentDate: new Date(),
      },
    });
  }
  updateProfile() {
    // if (this.paymentForm.invalid) {
    //   return;
    // }
    this.editProfile(this.Student).subscribe(
      (response) => {
        if (response) {
          Swal.fire({
            title: 'Good Job✌✌✌',
            icon: 'success',
            text: 'payment accepted ,check your mail for login credentials',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this._router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: '🤦‍♂️🤦‍♂️error',
            icon: 'error',
            text: 'something went wrong',
          });
        }
      },
      (errorMessage) => {
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
          timer: 1000,
          showConfirmButton: false,
          text: 'some internal error',
          icon: 'error',
        });
      }
    );
  }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cardnumber: new FormControl(null, [Validators.required]),
      month: new FormControl(null, [
        Validators.required,
        Validators.max(12),
        Validators.min(1),
      ]),
      year: new FormControl(null, [Validators.required, Validators.min(2021)]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.min(100),
        Validators.max(999),
      ]),
    });
    //**************************** */
    this.id = this._activatedRoute.snapshot.params['_id'];
    this._StudentService.fetchStudent(this.id).subscribe(
      (studentData: any) => {
        if (studentData.error) {
          this._router.navigate(['/error'], { state: studentData });
        }
        this.Student = JSON.parse(JSON.stringify(studentData));
        this.fee = this.courseFee[this.Student.Course];
        this.elevatedFee = this.fee * (10 / 100) + this.fee;
        this.studentFee = this.fee / 2;
        this.womenFee = this.fee / 2;
        // console.log(this.Student);
      },
      (errorMessage) => {
        Swal.fire({
          title: '🤦‍♂️🤦‍♂️🤦‍♂️danger!!',
          text: 'some internal error',
          timer: 1000,
          showConfirmButton: false,
          icon: 'error',
        });
      }
    );
  }
}
