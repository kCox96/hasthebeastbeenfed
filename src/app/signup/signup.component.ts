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



  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    const email = this.form.email;
    const username = this.form.username;
    const password = this.form.password;

    this.auth.signup(username, email, password).subscribe(
      (data) => {
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
