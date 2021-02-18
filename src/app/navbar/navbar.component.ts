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
  public isLoggedIn$ = new Observable<boolean>(); 
  public loggedIn = false;

  // ngOnInit(): void {
  //   console.log("isSignedIn variable value" + this.isSignedIn);
  //  // check if the user is signed in by searching if a token exists
  //   if (!this.token.getToken() === null ){
  //  // if token exists, display sign out link on navbar, remove signup and login links
  //     this.isSignedIn = true;
  //   }
  //   // if token doesn't exist, display login and signup links
  //   this.isSignedIn = false; 
    
  // }

  ngOnInit(): void {
  this.isLoggedIn$ = this.auth.isUserLoggedIn;
  this.isLoggedIn$.subscribe((data: boolean) => {
      this.loggedIn = data; 
      console.log(data);
  });

  }

  onSignOut (): void {
    //DEBUGGING - REMOVE BEFORE SUBMISSION
    
    this.token.signOut();

    this.router.navigate(['login'], {queryParams: {signedOut: 'true'}});
    this.reloadPage();

    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
