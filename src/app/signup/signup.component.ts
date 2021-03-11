import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // set form variables
  form: any = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userEmail: string;
  redirectFromHompage = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Handle route redirect from homepage
    // this.route.queryParams.subscribe((params) => {
    //   if (params.userEmail !== null && params.userEmail !== undefined) {
    //     this.userEmail = JSON.stringify(params.userEmail);
    //     console.log('queryParams user email' + this.userEmail);
    //     this.redirectFromHompage = true;
    //     console.log('redirect from homepage value ' + this.redirectFromHompage);
    //   }
    // });
  }

  onSubmit(): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION

    console.log('signup on submit called');
    const email = this.form.email;
    const username = this.form.username;
    const password = this.form.password;

    this.auth.signup(username, email, password).subscribe(
      (data) => {
        //DEBUGGING - REMOVE BEFORE SUBMISSION
        console.log('login submit request data' + JSON.stringify(data));
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.errorMessage;
        this.isSignUpFailed = true;
      }
    );
    // redirect user to login after creating account
    this.router.navigate(['login'], { queryParams: { registered: 'true' } });
  }
}
