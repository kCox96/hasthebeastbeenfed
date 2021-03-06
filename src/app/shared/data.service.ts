import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from './tokenStorage.service';
import { ICats, ICat, IFeed, IUser } from '../models/interface';

@Injectable()
export class DataService {
  APIUrl: string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private Token: TokenStorageService) {}

  //////////////////////////////////////////////////////////////////
  //  This service is used to retrieve/send data from the server  //
  //////////////////////////////////////////////////////////////////

  //Some header options for all requests
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    }),
  };

  //Get cats for cardview
  getCats(): Observable<ICats[]> {
    var userId: string;
    this.Token.userId.subscribe((data: string) => {
      userId = data;
    });
    return this.http
      .get<ICats[]>(this.APIUrl + 'cats/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Get cat for catEdit
  getCat(catId: string): Observable<ICat> {
    return this.http
      .get<ICat>(this.APIUrl + 'cat/' + catId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //replace the cat
  replaceCat(cat: ICat): Observable<any> {
    return this.http
      .post<any>(this.APIUrl + 'cats/replace/' + cat._id, cat, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //create cat for addcat page
  createCat(cat: ICat): Observable<any> {
    var userId: string;
    this.Token.userId.subscribe((data: string) => {
      userId = data;
    });
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

  //feedCat for adding a feeding event to a cat
  feedCat(catId: string, feed: IFeed): Observable<any> {
    return this.http
      .put<IFeed>(this.APIUrl + 'cats/feeding/' + catId, feed, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Get user details for account page
  getUser(): Observable<IUser> {
    var userId: string;
    this.Token.userId.subscribe((data: string) => {
      userId = data;
    });
    return this.http
      .get<IUser>(this.APIUrl + 'users/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update user details for account page
  updateUser(user: IUser): Observable<any> {
    var userId: string;
    this.Token.userId.subscribe((data: string) => {
      userId = data;
    });
    return this.http
      .post<any>(this.APIUrl + 'users/' + userId, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete user for account page
  deleteUser(): Observable<any> {
    var userId: string;
    this.Token.userId.subscribe((data: string) => {
      userId = data;
    });
    return this.http
      .delete<any>(this.APIUrl + 'users/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //error handler for all the above functions
  private handleError(error: any) {

    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
