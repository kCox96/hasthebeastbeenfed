import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { BindingElement } from 'typescript';

const TOKEN_KEY = 'auth-token';
const USER_NAME = 'auth-username';
const USER_ID = 'auth-userid';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  timeout;
  decoded;
  jwtDataUserId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  userData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  tokenSubscription = new Subscription();
  jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  // Clear token data on sign out
  public signOut(): void {
    // Make sure dummy token subscription is cleared
    this.tokenSubscription.unsubscribe();
    // Remove all user data from session storage
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    // replace current token with most recent token
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.getTokenExpiry(token);
    this.saveUsername(token);
    this.saveUserId(token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  getTokenExpiry(token: any) {
    // calculate how long till session expiry

    this.timeout =
      this.jwtHelper.getTokenExpirationDate(token).valueOf() -
      new Date().valueOf();
    // start a counter to log user out
    this.expirationCounter(this.timeout);
  }

  expirationCounter(timeout) {
    // unsubscribe from previous subscriptions to prevent memory leaks
    this.tokenSubscription.unsubscribe();
    // create a subscription using empty observable and set a delay equal to time till expiration of jwt
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe((expired) => {
        this.signOut();
        this.router.navigate(['login'], {
          queryParams: { sessionExpired: 'true' },
        });
      });
  }

  saveUsername(token: any): void {
    this.decoded = jwt_decode(token);
    let username = this.decoded.name;
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  saveUserId(token: any): void {
    this.decoded = jwt_decode(token);
    let userId = this.decoded.id;
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, userId);
  }

  public get username(): any {
    let username = window.sessionStorage.getItem(USER_NAME);
    this.userData.next(username);
    if (this.userData !== null) {
      return this.userData.asObservable();
    }
  }

  public get userId(): any {

    let userId = window.sessionStorage.getItem(USER_ID);
    this.jwtDataUserId.next(userId);
    if (this.jwtDataUserId !== null) {
      return this.jwtDataUserId.asObservable();
    }
  }
}
