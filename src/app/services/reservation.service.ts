
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Reservations } from '../interfaces/reservation.interface'

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly API: string = environment.apiUrl + '/reservations';

  constructor(private httpClient: HttpClient) {}


  createReservation(reservation: Reservations) {
    return this.httpClient.post<any>(`${this.API}/new`, reservation);
  }

  updateReservation(reservation: Reservations, id: string) {
    return this.httpClient.put<any>(`${this.API}/reservation/${id}`, reservation);
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
}
