import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class IpServiceService {
  constructor(private httpClient: HttpClient) {}

  getIpAdresse() {
    return this.httpClient
      .get('https://api.ipify.org/?format=json')
      .pipe(catchError(this.handleError));
  }
  getGEOLocation(ip) {
    let url =
      'https://api.ipgeolocation.io/ipgeo?apiKey=89c2558f20ce46a6a68ffeb6f6b853ef&ip=' +
      ip;
    return this.httpClient.get(url).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
