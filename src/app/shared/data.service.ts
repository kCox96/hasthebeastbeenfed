import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ICats, ICat, IFeed } from './interface';

@Injectable()
export class DataService {
  baseUrl: string = 'assets/';
  APIUrl: string = 'localhost:3000/api/';

  constructor(private http: HttpClient, private Auth: AuthenticationService) {}

  //////////////////////////////////////////////////////////////////
  //  This service is used to retrieve/send data from the server  //
  //////////////////////////////////////////////////////////////////

  //Some header options for all requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Stringify in case its NULL
      'auth-token': JSON.stringify(this.Auth.getToken()),
    }),
  };

  // Example for testing DELETE FOR FINAL
  getCatsExample(id: string): Observable<ICats[]> {
    return this.http
      .get<ICats[]>(this.baseUrl + 'cats.json', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Get cats for cardview
  getCats(userId: string): Observable<ICats[]> {
    return this.http
      .get<ICats[]>(this.APIUrl + 'cats/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //create cat for addcat page
  createCat(userId: string, cat: ICat): Observable<any> {
    return this.http
      .post<ICat>(this.APIUrl + 'cats/' + userId, cat, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //deletecat for delete cat page
  deleteCat(catId: string): Observable<any> {
    return this.http
      .delete<any>(this.APIUrl + 'cats/' + catId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //feed cat
  feedCat(catId: string, feed: IFeed): Observable<any> {
    return this.http
      .put<IFeed>(this.APIUrl + 'cats/feeding/' + catId, feed, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // UpdateCat(userId: string, cat: ICat): Observable<any> {
  //   return this.http
  //     .post<ICat>(this.APIUrl + 'cats/' + userId, cat, this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  //error handler for all the above functions
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
