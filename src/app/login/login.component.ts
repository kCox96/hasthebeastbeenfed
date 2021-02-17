import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  errorMessage = ''

  
  constructor(private auth: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router) {}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
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
       this.reloadPage();

        this.router.navigateByUrl('/account');
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
