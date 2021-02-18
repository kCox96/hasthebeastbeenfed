import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

// for node backend
const TOKEN_HEADER_KEY = 'auth-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // DEBUGGING - REMOVE BEFORE SUBMISSION 
        console.log("intercept service has been called");
        let authReq = req; 
        const token = this.tokenService.getToken();
        if (token != null){
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
         // DEBUGGING - REMOVE BEFORE SUBMISSION 
        console.log("auth request" + JSON.stringify(authReq));
        return next.handle(authReq);
    }
}
export const AuthInterceptorProviders = [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];
