import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null, 
    email: null, 
    password: null, 
  };

  isSuccessful = false; 
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
  }

  onSubmit() : void {
    const { username, email, password } = this.form; 
    this.auth.signup(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true; 
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.errorMessage;
        this.isSignUpFailed = true; 
      }
    );
  }

}
