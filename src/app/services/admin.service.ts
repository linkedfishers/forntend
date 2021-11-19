import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/users.interface';
import { roundToNearestMinutesWithOptions } from 'date-fns/fp';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly API: string = environment.apiUrl + '/admin';

  constructor(private httpClient: HttpClient) {}

  getOrders() {
    return this.httpClient.get<any>(`${this.API}/order/all`);
  }
  updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${this.API}/order/${orderId}`,
      orderStatus
    );
  }
  getUsers(count: number, skip: number) {
    return this.httpClient.get<any>(`${this.API}/users/${count}/${skip}`);
  }

  getOverview() {
    return this.httpClient.get<any>(`${this.API}/overview`);
  }

  createSouscatType(formData: FormData, categoryName: string, id: string) {
    return this.httpClient.post<any>(
      `${this.API}/boat/type/${id}/addSouscatType`,
      formData
    );
  }

  createCategoryType(formData: FormData, categoryName: string) {
    return this.httpClient.post<any>(
      `${this.API}/${categoryName}/addType`,
      formData
    );
  }
  createSouCat(formData: FormData, categorieName: string, categorie: string) {
    return this.httpClient.post<any>(
      `${this.API}/${categorieName}/${categorie}/addSousType`,
      formData
    );
  }

  createEquipmentType(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/equipment/addType`, formData);
  }

  deleteCategoryType(id: string, categoryName: string) {
    return this.httpClient.delete<any>(`${this.API}/${categoryName}/${id}`);
  }

  deleteEquipmentType(id: string) {
    return this.httpClient.delete<any>(`${this.API}/equipment/${id}`);
  }

  getReports(userId: string) {
    return this.httpClient.get<any>(`${this.API}/reports/${userId}`);
  }

  deleteReport(reportId: string) {
    return this.httpClient.delete<any>(`${this.API}/reports/${reportId}`);
  }

  updateUserStatus(userId: string, activated: boolean) {
    return this.httpClient.put<any>(`${this.API}/users/${userId}`, {
      activated,
    });
  }

  getAllProviders() {
    return this.httpClient.get<any>(`${this.API}/providers/`);
  }
  createContent(formData: FormData) {
    return this.httpClient.post<any>(
      `${this.API}/content/addContent`,
      formData
    );
  }

  getContent(id: string) {
    return this.httpClient.get<any>(`${this.API}/content/get/${id}`);
  }

  updateContent(id: string, formData: FormData) {
    return this.httpClient.put<any>(`${this.API}/content/${id}`, formData);
  }

  updateBoatType(formData: FormData, id: string /* , catname:string */) {
    return this.httpClient.put<any>(`${this.API}/boat/${id}`, formData);
  }
}
