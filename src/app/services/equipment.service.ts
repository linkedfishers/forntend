import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  readonly API: string = environment.apiUrl + '/equipments';

  constructor(private httpClient: HttpClient) { }
//Create new Equipement
  createBoat(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/boat/new`, formData);
  }
  createEquipment(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/equipment/new`, formData);
  }

  createHebergement(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/hebergement/new`, formData);
  }
  createMonitor(formData:FormData){
    return this.httpClient.post<any>(`${this.API}/monitor/new`,formData);
  }

//Update Equipement

  updateMonitor(formData:FormData, id:string){
    return this.httpClient.put<any>(`${this.API}/monitor/${id}`,formData)
  }
    updateHebergement(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/hebergement/${id}`, formData);
  }
      updateBoat(formData: FormData, id: string) {
        return this.httpClient.put<any>(`${this.API}/boat/${id}`, formData);
      }

<<<<<<< HEAD
      updateEquipment(formData: FormData, id: string) {
        return this.httpClient.put<any>(`${this.API}/equipment/${id}`, formData);
      }
=======
  getBoatTypes() {
    return this.httpClient.get<any>(`${this.API}/boat/types`);
  }

  getHebergementTypes() {
    return this.httpClient.get<any>(`${this.API}/hebergement/types`);
  }

  getEquipmentsByUser(userId: string) {
    return this.httpClient.get<any>(`${this.API}/user/${userId}`);
  }
>>>>>>> d3df9c09083a762d1bbc75389ea832b5c56334b9

    //getEquipement by user and by type

      getMonitorTypes(){
        return this.httpClient.get<any>(`${this.API}/types`);

      }
      getMonitorsByUser(id:string){
      return this.httpClient.get<any>(`${this.API}/user/${id}`)

<<<<<<< HEAD
    }
=======
  getBoats() {
    return this.httpClient.get<any>(`${this.API}/boats/all/`);
  }
>>>>>>> d3df9c09083a762d1bbc75389ea832b5c56334b9

    getMonitorByTypeAndUser(typeId:string,id:string){
      return this.httpClient.get<any>(`${this.API}/type/${typeId}/user/${id}`)
    }



    getEquipmentTypes() {
      return this.httpClient.get<any>(`${this.API}/types`);
    }

    getEquipmentsByUser(userId: string) {
      return this.httpClient.get<any>(`${this.API}/user/${userId}`);
    }

    getEquipmentsByTypeAndUser(typeId: string, userId: string) {
      return this.httpClient.get<any>(`${this.API}/type/${typeId}/user/${userId}`);
    }

    getBoatsByUser(userId: string) {
      return this.httpClient.get<any>(`${this.API}/boats/user/${userId}`);
    }
    getHebergementsByUser(userId: string) {
      return this.httpClient.get<any>(`${this.API}/hebergements/user/${userId}`);
    }

    getMonitors(){
      return this.httpClient.get<any>(`${this.API}/monitors/all`)
    }

    getHebergements() {
      return this.httpClient.get<any>(`${this.API}/hebergements/all/`);
    }

    getBoats() {
      return this.httpClient.get<any>(`${this.API}/boats/all/`);
    }

    //delete Equipement

    deleteMonitor(id:string){
      return this.httpClient.delete<any>(`${this.API}/monitor/${id}`)
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

  getMonitor(id:string){
    return this.httpClient.get<any>(`${this.API}/monitor/${id}`)
  }

    getEquipment(id: string) {
      return this.httpClient.get<any>(`${this.API}/equipment/${id}`);
    }

    getBoat(id: string) {
      return this.httpClient.get<any>(`${this.API}/boat/${id}`);
    }

    getHebergement(id: string) {
      return this.httpClient.get<any>(`${this.API}/hebergement/${id}`);
    }

  }
