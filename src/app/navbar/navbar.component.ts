import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { TokenStorageService } from '../shared/token-storage.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private auth: AuthenticationService, private router: Router, private token: TokenStorageService){
  }
  // Make sure to add the variable in the component
  public shouldShow = false;
  // login check variables 
  public isLoggedIn$ = new Observable<boolean>(); 
  public loggedIn = false;

  // When component is initialised, subscribe to get method in auth service to run consistent checks
  // about a user's login state
  ngOnInit(): void {
  this.isLoggedIn$ = this.auth.isUserLoggedIn;
  this.isLoggedIn$.subscribe((data: boolean) => {
      this.loggedIn = data; 
      //DEBUGGING - REMOVE BEFORE SUBMISSION
      console.log(data);
  });

  }

  onSignOut (): void {
    this.token.signOut();
    // take user to login page on logout 
    this.router.navigate(['login'], {queryParams: {signedOut: 'true'}});
     //DEBUGGING - REMOVE BEFORE SUBMISSION
    this.reloadPage();

    
  }
  //DEBUGGING METHOD - REMOVE BEFORE SUBMISSION
  reloadPage(): void {
    window.location.reload();
  }
}
