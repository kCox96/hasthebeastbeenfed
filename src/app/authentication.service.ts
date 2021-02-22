import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails } from './models/userdetails.model';
import { TokenPayload } from './models/tokenpayload.model';
import { TokenResponse } from './models/tokenresponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private request(
    method: 'post' | 'get',
    type: 'login' | 'signup' | 'home',
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'signup', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'home');
  }
}
