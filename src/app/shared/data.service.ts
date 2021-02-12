import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getToken } from '../authentication.service';
import { ICats, ICat, IFeed } from './interface';

@Injectable()
export class DataService {
  baseUrl: string = 'assets/';
  APIUrl: string = 'localhost:3000/api/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': getToken(),
    }),
  };

  getCatsExample(id: string): Observable<ICats[]> {
    return this.http
      .get<ICats[]>(this.baseUrl + 'cats.json', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCats(userId: string): Observable<ICats[]> {
    return this.http
      .get<ICats[]>(this.APIUrl + 'cats/' + userId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createCat(userId: string, cat: ICat): Observable<any> {
    return this.http
      .post<ICat>(this.APIUrl + 'cats/' + userId, cat, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCat(catId: string): Observable<any> {
    return this.http
      .delete<any>(this.APIUrl + 'cats/' + catId, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  feedCat(catId: string, feed: IFeed): Observable<any> {
    return this.http.put<IFeed>(
      this.APIUrl + 'cats/feeding/' + catId,
      feed,
      this.httpOptions
    );
  }

  // UpdateCat(userId: string, cat: ICat): Observable<any> {
  //   return this.http
  //     .post<ICat>(this.APIUrl + 'cats/' + userId, cat, this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
