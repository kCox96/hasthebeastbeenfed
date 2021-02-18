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
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() : void {
     // DEBUGGING - REMOVE BEFORE SUBMISSION 
     console.log("signup on submit called");
    const { username, email, password } = this.form; 
    this.auth.signup(username, email, password).subscribe(
      data => {
        //DEBUGGING - REMOVE BEFORE SUBMISSION
        console.log("login submit request data" + JSON.stringify(data));
        this.isSuccessful = true; 
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.errorMessage;
        this.isSignUpFailed = true; 
      }
    );
    this.router.navigate(['login'], {queryParams : { registered: 'true'}});
  }

}
