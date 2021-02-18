import { Injectable } from '@angular/core';
import jwt_decode, { JwtHeader, JwtPayload} from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})


export class TokenStorageService {

  constructor() { }

  // Clear token data on sign out 
  signOut(): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("sign out called");
    console.log("session storage before" + JSON.stringify(window.sessionStorage));
    window.sessionStorage.clear();
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("session storage after" + JSON.stringify(window.sessionStorage));
  }

  public saveToken(token: string): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("Token storage - saveToken called");
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt_decode<JwtPayload>(token);

  //   if (decoded.exp === undefined) return null;

  //   const date = new Date(0); 
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if(!token) token = this.getToken();
  //   if(!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if(date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }


  public saveUser(user: any): void {
    // DEBUGGING - REMOVE BEFORE SUBMISSION
    console.log("Token storage - saveUser called");
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user);
    }

    return {}; 
  }
}
