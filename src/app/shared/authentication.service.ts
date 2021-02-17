import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import {  UserLogin } from '../models/userlogin.model';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

const AUTH_BASE = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  private token: string;
  

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any>{
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("authentication service - login post called");
    return this.http.post<UserLogin>(AUTH_BASE + 'login', {
      email,
      password }, httpOptions);
    }

    signup(username:string,email:string,password:string): Observable<any> {
          // DEBUGGING - REMOVE BEFORE SUBMISSION
      console.log("authentication service - signup called");
      return this.http.post(AUTH_BASE + 'signup', {
        username,
        email,
        password }, httpOptions);
      
    }
  }



