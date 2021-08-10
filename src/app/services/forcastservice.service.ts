import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForcastserviceService {
  constructor(private http: HttpClient) {}
  getWeatherForcast() {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next(pos);
        },
        (error) => {
          observer.next(error);
        }
      );
    }).pipe(
      map((val: any) => {
        return new HttpParams()
          .set('lon', val.coords.longitude)
          .set('lat', val.coords.latitude)
          .set('units', 'metric')
          .set('appId', 'ca73b9253fb0753ca439d964a688acba');
      }),
      switchMap((values) => {
        return this.http.get(
          'http://api.openweathermap.org/data/2.5/forecast',
          { params: values }
        );
      })
    );
  }
}
