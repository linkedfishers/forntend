import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../interfaces/reviews.interface';
import { Event } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly API: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createEvent(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/events/new`, formData);
  }
  updateEvent(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/events/${id}`, formData);
  }
  deleteEvent(id: string) {
    return this.httpClient.delete<any>(`${this.API}/events/${id}`);
  }

  getEventByMonth(month: number) {
    return this.httpClient.get<any>(`${this.API}/events/month/${month}`);
  }

  getTodayEvents() {
    return this.httpClient.get<any>(`${this.API}/events/today`);
  }
  getUpcoming() {
    return this.httpClient.get<any>(`${this.API}/events/upcoming`);
  }

  getAll() {
    return this.httpClient.get<any>(`${this.API}/events/all/`);
  }
  addReview(review: Review, categoryName: string) {
    return this.httpClient.post<any>(`${this.API}/${categoryName}/review`, review);
  }

  getEventById(id : string) {
    return this.httpClient.get<any>(`${this.API}/events/event/${id}`);
  }
  addGoing(id : string,going : boolean) {
    let path = going ? 'going' : 'remove-going';
    return this.httpClient.put<any>(`${this.API}/events/${path}/${id}`,{});
  }
  addInterested(id : string) {
    return this.httpClient.put<any>(`${this.API}/events/interested/${id}`,{});
  }
}
