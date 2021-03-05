import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { TokenStorageService } from './tokenStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate() {
    // if a jwt exists, allow access
    if (this.tokenStorage.getToken()) {
      return true;
    }

    // if no jwt token, redirect to login
    this.router.navigate(['login']);
    return false;
  }
}
