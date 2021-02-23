import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { TokenStorageService } from '../shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/**
 * This component handles login requests
 */
export class LoginComponent implements OnInit {
  // set variable for form data
  form: any = {
    email: null,
    password: null,
  };

  // error handling variable
  isLoginFailed = false;

  // variables for displaying information
  errorMessage = '';
  infoMessage = '';
  logoutMessage = '';
  sessionExpiredMessage = '';

  // Import all services in constructor
  constructor(
    private auth: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Handle redirect from signup page
    this.route.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.infoMessage = 'Registration Successful! Please Login!';
      }
    });
    // Handle redirect from signout button
    this.route.queryParams.subscribe((params) => {
      if (params.signedOut !== undefined && params.signedOut === 'true') {
        this.logoutMessage = 'Your signout has been successful!';
      }
    });

    // Handle redirect from jwt expiry
    this.route.queryParams.subscribe((params) => {
      if (
        params.sessionExpired !== undefined &&
        params.sessionExpired === 'true'
      ) {
        this.sessionExpiredMessage = 'Session expired. Please login.';
      }
    });
  }

  onSubmit(): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('login on submit called');
    // Pull values from form
    const { email, password } = this.form;

    // use auth login method to login with credentials pulled from form
    this.auth.login(email, password).subscribe(
      (data) => {
        // DEBUGGING - REMOVE BEFORE SUBMISSION
        console.log('login data' + JSON.stringify(data));
        console.log('token value ' + JSON.stringify(data));
        // Save token and user data using method defined in token service
        this.tokenStorage.saveToken(data.data.token);
        this.tokenStorage.saveUser(data.data);
        // Set this flag for error handling and displaying error information on client side
        this.isLoginFailed = false;

        // navigate user to account screen when they've logged in
        this.router.navigate(['cardview']);
        // this.reloadPage();
      },
      // error handling
      (err) => {
        this.errorMessage = JSON.stringify(err.error.error);
        // set boolean used to display error message in template
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
