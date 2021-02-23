import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  timeout;
  decoded;
  tokenSubscription = new Subscription();
  jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  // Clear token data on sign out
  signOut(): void {
    // Make sure dummy token subscription is cleared
    this.tokenSubscription.unsubscribe();
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('sign out called');
    console.log(
      'session storage before' + JSON.stringify(window.sessionStorage)
    );
    // Remove all user data from session storage
    window.sessionStorage.clear();
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log(
      'session storage after' + JSON.stringify(window.sessionStorage)
    );
  }

  public saveToken(token: string): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('Token storage - saveToken called');
    console.log('token value ' + JSON.stringify(token));
    // replace current token with most recent token
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.getTokenExpiry(token);
    // this.getUser(token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getTokenExpiry(token: any) {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('Get token expiry called');
    console.log('token value ' + token);
    // calculate how long till session expiry

    this.timeout =
      this.jwtHelper.getTokenExpirationDate(token).valueOf() -
      new Date().valueOf();
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('timeout value ' + this.timeout);
    // start a counter to log user out
    this.expirationCounter(this.timeout);
  }

  expirationCounter(timeout) {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('expiration counter called');
    // unsubscribe from previous subscriptions to prevent memory leaks
    this.tokenSubscription.unsubscribe();
    // create a subscription using empty observable and set a delay equal to time till expiration of jwt
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe((expired) => {
        // DEBUGGING - REMOVE BEFORE SUBMISSION
        console.log('EXPIRED!!');

        this.signOut();
        this.router.navigate(['login'], {
          queryParams: { sessionExpired: 'true' },
        });
      });
  }

  public saveUser(user: any): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('Token storage - saveUser called');
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log('user data ' + JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    let token = this.getToken();
    if (token !== null) {
      this.decoded = jwt_decode(token);
      //DEBUGGING - REMOVE BEFORE SUBMISSION
      // console.log('get user method results ' + JSON.stringify(this.decoded));
      return this.decoded;
    }

    return null;
  }
}
