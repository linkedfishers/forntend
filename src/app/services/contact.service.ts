import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  readonly API: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendMessage(messageContent: any) {
    return this.http.post(this.API, JSON.stringify(messageContent), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    });
  }
}
