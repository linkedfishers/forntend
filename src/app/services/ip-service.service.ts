import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getCurrencyData(to: String) {
    const urlApi = `https://api.getgeoapi.com/v2/currency/convert?api_key=ec7dae1378be60f8900bea74e52ccc26562a497d&from=TND&to=${to}&amount==10&format=json`;
    
    /* 
    test with static API 
        //const urlApi = `https://api.getgeoapi.com/v2/currency/convert?api_key=ec7dae1378be60f8900bea74e52ccc26562a497d&from=USD&to=TND&amount==1&format=json`;
    */
    return this.httpClient
      .get<any>(`${urlApi}`)
      .pipe(catchError(this.handleError));
  }
}
