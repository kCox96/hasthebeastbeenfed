import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { TokenStorageService } from '../shared/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  infoMessage = '';
  logoutMessage = '';
  
  constructor(private auth: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.route.queryParams
    .subscribe(params => {
      if(params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Registration Successful! Please Login!';
      }
    });

    this.route.queryParams
    .subscribe(params => {
      if(params.signedOut !== undefined && params.signedOut === 'true') {
          this.logoutMessage = 'Your signout has been successful!';
      }
    });
  }

  onSubmit(): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("login on submit called");
    const { email, password } = this.form; 
    this.auth.login(email, password).subscribe(
      data => {
        // DEBUGGING - REMOVE BEFORE SUBMISSION
        console.log("login data" + JSON.stringify(data));

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.reloadPage();

        this.router.navigate(['account']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true; 
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
 

}
