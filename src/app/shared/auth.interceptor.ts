import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';


// for node backend
const TOKEN_HEADER_KEY = 'auth-token';

/**
 * Class to intercept all http requests and append JWT to header 
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenStorageService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // DEBUGGING - REMOVE BEFORE SUBMISSION 
        console.log("intercept service has been called");
        let authReq = req; 
        const token = this.tokenService.getToken();
        // if token exists, append token to request header 
        if (token != null){
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }

        // if (isTokenExpired){
            // DEBUGGING - REMOVE BEFORE SUBMISSION
        //     console.log("token expired");
        //     this.router.navigate(['login'], {queryParams : { sessionExpired: 'true'}});
        // }

        if (token)
         // DEBUGGING - REMOVE BEFORE SUBMISSION 
        console.log("auth request" + JSON.stringify(authReq));
        // return modified request
        return next.handle(authReq);
    }
}
// export for use across entire application 
export const AuthInterceptorProviders = [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];
