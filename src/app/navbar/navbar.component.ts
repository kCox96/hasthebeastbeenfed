import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { TokenStorageService } from '../shared/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private token: TokenStorageService
  ) {}
  // Make sure to add the variable in the component
  public shouldShow = false;
  // login check variables
  public isLoggedIn$ = new Observable<boolean>();
  public loggedIn = false;
  public userData;
  public username;
  public userSub$ = new Observable<string>();

  // When component is initialised, subscribe to get method in auth service to run consistent checks
  // about a user's login state
  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isUserLoggedIn;
    this.isLoggedIn$.subscribe((data: boolean) => {
      this.loggedIn = data;
    });

    this.userData = this.token.getUser();
    if (this.userData !== null) {
      console.log('user data at navbar' + this.userData);
      this.username = this.userData.name;
      console.log(this.username);
    }
  }

  onSignOut(): void {
    this.token.signOut();
    // take user to login page on logout
    this.router.navigate(['login'], { queryParams: { signedOut: 'true' } });
  }
  //DEBUGGING METHOD - REMOVE BEFORE SUBMISSION
  reloadPage(): void {
    window.location.reload();
  }
}
