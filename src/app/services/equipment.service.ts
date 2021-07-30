import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../interfaces/reviews.interface';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  readonly API: string = environment.apiUrl + '/equipments';

  constructor(private httpClient: HttpClient) {}
  createService(FormData: FormData) {
    return this.httpClient.post<any>(`${this.API}/service/new`, FormData);
  }
  createBoat(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/boat/new`, formData);
  }

  createEquipment(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/equipment/new`, formData);
  }
  createHebergement(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/hebergement/new`, formData);
  }

  updateHebergement(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/hebergement/${id}`, formData);
  }
  updateService(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/service/${id}`, formData);
  }
  updateBoat(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/boat/${id}`, formData);
  }

  updateEquipment(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/equipment/${id}`, formData);
  }
  getEquipmentTypes() {
    return this.httpClient.get<any>(`${this.API}/types`);
  }
  getServiceTypes() {
    return this.httpClient.get<any>(`${this.API}/service/types`);
  }
  getBoatTypes() {
    return this.httpClient.get<any>(`${this.API}/boat/types`);
  }

  getHebergementTypes() {
    return this.httpClient.get<any>(`${this.API}/hebergement/types`);
  }

  getEquipmentsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/user/${userId}`);
  }
  getServicesByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/service/user/${userId}`);
  }

  getEquipmentsByTypeAndUser(typeId: string, userId: string) {
    return this.httpClient.get<any>(
      `${this.API}/type/${typeId}/user/${userId}`
    );
  }
  getServicesByTypeAndUser(typeId: string, userId: string) {
    return this.httpClient.get<any>(
      `${this.API}/service/type/${typeId}/user/${userId}`
    );
  }
getBoatsByType(typeId:string){
  return this.httpClient.get<any>(`${this.API}/boats/type/${typeId}`)
}
getServicessByType(typeId:string){
  return this.httpClient.get<any>(`${this.API}/services/type/${typeId}`)
}
getEquipmentssByType(typeId:string){
  return this.httpClient.get<any>(`${this.API}/equipments/type/${typeId}`)
}
getHebergementsByType(typeId:string){
  return this.httpClient.get<any>(`${this.API}/hebergements/type/${typeId}`)
}
  getBoatsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/boats/user/${userId}`);
  }
  getHebergementsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/hebergements/user/${userId}`);
  }
  getServices() {
    return this.httpClient.get<any>(`${this.API}/services/all/`);
  }
  getHebergements() {
    return this.httpClient.get<any>(`${this.API}/hebergements/all/`);
  }

  getEquipments() {
    return this.httpClient.get<any>(`${this.API}/all/`);
  }
  getBoats() {
    return this.httpClient.get<any>(`${this.API}/boats/all/`);
  }
  deleteService(id: string) {
    return this.httpClient.delete<any>(`${this.API}/service/${id}`);
  }
  deleteEquipment(id: string) {
    return this.httpClient.delete<any>(`${this.API}/equipment/${id}`);
  }

  deleteBoat(id: string) {
    return this.httpClient.delete<any>(`${this.API}/boat/${id}`);
  }

  deleteHebergement(id: string) {
    return this.httpClient.delete<any>(`${this.API}/hebergement/${id}`);
  }

  getEquipment(id: string) {
    return this.httpClient.get<any>(`${this.API}/equipment/${id}`);
  }
  getServie(id: string) {
    return this.httpClient.get<any>(`${this.API}/service/${id}`);
  }

  getBoat(id: string) {
    return this.httpClient.get<any>(`${this.API}/boat/${id}`);
  }

  getHebergement(id: string) {
    return this.httpClient.get<any>(`${this.API}/hebergement/${id}`);
  }

  addReview(review: Review, categoryName: string) {
    return this.httpClient.post<any>(
      `${this.API}/${categoryName}/review`,
      review
    );
  }
}
