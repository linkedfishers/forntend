import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  orders: Order[] = [];
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.orders}`);
  }

  getOrder(id: string) {
    return this.http.get<any>(`${this.API}/order/${id}`);
  }
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.API2}/order/new`, order);
  }
  getProduct(id: string) {
    return this.http.get<any>(`${this.API_PROD}/product/${id}`);
  }
}
