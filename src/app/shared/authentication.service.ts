import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserLogin } from '../models/userLogin.model';

import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorageService } from './tokenStorage.service';

const AUTH_BASE = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // variables to check users logged in state and jwt expiry
  private token: string;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private timeout;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenStorageService
  ) {
    // if token exists, set the user state to logged in
    if (tokenService.getToken() !== null) {
      this.isLoggedIn.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    // set user state to logged in
    this.isLoggedIn.next(true);
    return this.http.post<UserLogin>(
      AUTH_BASE + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_BASE + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  public get isUserLoggedIn() {
    // return the value of user login state as an observable
    return this.isLoggedIn.asObservable();
  }
}
