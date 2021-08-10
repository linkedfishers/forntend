import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeathrserviceService {
  constructor(private http: HttpClient) {}

  getMarine(location) {
    return this.http.get<any>(
      `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=cc7eaaba82a74deeac7151317210508&q=${location}&format=json&num_of_days=1`
    );
  }
}
