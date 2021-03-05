import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { IUser } from '../models/interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [DataService],
})
export class AccountComponent {
  user: IUser;

  constructor(private dataService: DataService) {}

  getUserDetails() {
    this.dataService.getUser().subscribe((user: IUser) => (this.user = user));
  }

  // set form variables
  form: any = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  errorMessage = '';

  ngOnInit() {
    this.getUserDetails();
  }
}
