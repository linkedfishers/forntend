import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order.interface';
import { OrderItem } from '../interfaces/orderItems.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly API: string = environment.apiUrl + '/admin';
  readonly API_PROD: string = environment.apiUrl + '/products';
  readonly API2: string = environment.apiUrl + '/equipments';
  readonly SenbBoxApi: string = 'https://sandbox.paymee.tn/gateway/';
  readonly responseUrl: string = '';

  orders: Order[] = [];
  constructor(private http: HttpClient) {}
  readonly ID_TOKEN = 'acessToken';

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orders}`);
  }

  getOrder(id: string) {
    return this.http.get<any>(`${this.API}/order/${id}`);
  }
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.API2}/order/new`, order);
  }

  loadGatwayiframe(token: string) {
    return this.http.get<any>(`${this.SenbBoxApi}${token}`);
  }

  getResponse(token: string) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Token 54148a5067586aef941cb00ca702e84aef3caf56',
    });
    const url = ` https://sandbox.paymee.tn/api/v1/payments/${token}/check`;
    return this.http.get<any>(`${url}`, { headers: headers });
  }

  getProduct(id: string) {
    return this.http.get<any>(`${this.API_PROD}/product/${id}`);
  }
}
