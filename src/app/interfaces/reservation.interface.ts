import { Hebergement, Boat, Equipment, Service } from "./equipments.interface";
import { User } from "./users.interface";

export class Reservation {
  _id: string;
  reservedBy: User;
  dateStart: Date;
  dateEnd: Date;
  home: Hebergement;
  boat: Boat;
  ownedBy:User;
  equipment: Equipment;
  service: Service;
  status: any;
}
