
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation.interface'

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly API: string = environment.apiUrl + '/reservations';

  constructor(private httpClient: HttpClient) { }


  createReservation(reservation: Reservation) {
    return this.httpClient.post<any>(`${this.API}/new`, reservation);
  }

  updateReservation(reservation: Reservation) {
    return this.httpClient.put<any>(`${this.API}/reservation/`, reservation);
  }
  getReservationsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/user/${userId}`);
  }
  getReservations() {
    return this.httpClient.get<any>(`${this.API}/reservations/all/`);
  }

  deleteReservation(id: string) {
    return this.httpClient.delete<any>(`${this.API}/reservation/${id}`);
  }
  getReservation(id: string) {
    return this.httpClient.get<any>(`${this.API}/reservation/${id}`);
  }

  getReservationsByCategory(id: string, category: string) {
    return this.httpClient.get<any>(`${this.API}/${category}/${id}`);
  }

  getMyPendingReservations(id: string, category: string) {
    return this.httpClient.get<any>(`${this.API}/my-pending/${category}/${id}`);
  }

  getOwnerReservations() {
    return this.httpClient.get<any>(`${this.API}/owner-requests`);
  }

}
