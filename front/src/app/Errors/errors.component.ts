import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-error',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
})
export class ErrorsComponent implements OnInit {
  err: any;
  error: any;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.err = this.location.getState();
  }
}
