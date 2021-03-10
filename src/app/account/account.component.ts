import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { IUser } from '../models/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [DataService],
})
export class AccountComponent {
  user: IUser;

  constructor(private dataService: DataService, private router: Router) {}

  // Method to get the current logged in user details
  getUserDetails() {
    this.dataService.getUser().subscribe((user: IUser) => (this.user = user));
  }

  // Set form variables
  form: any = {
    username: null,
    email: null,
    password: null,
  };

  // Error handling
  isSuccessful = false;
  isDeleteSuccessful = false;
  errorMessage = '';

  ngOnInit() {
    this.getUserDetails();
  }

  onSubmit(): void {
    // If the form fields are set then replace the values in the user object
    if (this.form.email) {
      this.user.email = this.form.email;
    }
    if (this.form.username) {
      this.user.username = this.form.username;
    }
    if (this.form.password) {
      this.user.password = this.form.password;
    }

    this.dataService.updateUser(this.user).subscribe(
      (user: IUser) => {
        console.log(JSON.stringify(user));
        this.isSuccessful = true;
      },
      (err) => {
        this.errorMessage = err.error.errorMessage;
        this.isSuccessful = false;
      }
    );
  }

  onDeleteSubmit(): void {
    // Call the delete service
    this.dataService.deleteUser().subscribe(
      () => {
        this.isDeleteSuccessful = true;
        this.router.navigate(['login'], {
          queryParams: { signedOut: 'true' },
        });
      },
      (err) => {
        this.errorMessage = err.error.errorMessage;
        this.isDeleteSuccessful = false;
      }
    );
  }
}
