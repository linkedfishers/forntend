import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/users.interface';
import { roundToNearestMinutesWithOptions } from 'date-fns/fp';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly API: string = environment.apiUrl + '/admin';

  constructor(private httpClient: HttpClient) {}

  getUsers(count: number, skip: number) {
    return this.httpClient.get<any>(`${this.API}/users/${count}/${skip}`);
  }

  getOverview() {
    return this.httpClient.get<any>(`${this.API}/overview`);
  }

  createCategoryType(formData: FormData, categoryName: string) {
    return this.httpClient.post<any>(
      `${this.API}/${categoryName}/addType`,
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
