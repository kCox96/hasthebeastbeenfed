import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';
import { TokenStorageService } from '../shared/tokenStorage.service';
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
  public userData$ = new Observable<string>();
  public username;
  public userId$ = new Observable<string>();
  public userId;

  // When component is initialised, subscribe to get method in auth service to run consistent checks
  // about a user's login state
  async ngOnInit(): Promise<void> {
    this.isLoggedIn$ = await this.auth.isUserLoggedIn;
    this.isLoggedIn$.subscribe((data: boolean) => {
      this.loggedIn = data;
    });

    this.userData$ = await this.token.username;
    this.userData$.subscribe((data: any) => {
      // set username and trim double quotes
      if (data !== null) {
        this.username = data.replace(/['"]+/g, '');
        // DEBUGGING
        console.log('user data at navbar ' + this.username);
      }
    });

    // HOW TO USE GET USER ID SERVICE
    this.userId$ = await this.token.userId;
    this.userId$.subscribe((data: any) => {
      if (data !== null) {
        this.userId = data;
        // DEBUGGING
        console.log('user id at navbar ' + this.userId);
      }
    });
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
