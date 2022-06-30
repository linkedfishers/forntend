import { Review } from './reviews.interface';

export class SousCatBoatType {
  _id: string;
  name: string;
}

export class Equipment {
  _id: string;
  name: string;
  price: number = 0;
  owner: any;
  type: any;
  image: string;
  images: any[] = [];
  description: string;
  country: string
  position: any;
  isAvailable: boolean;
  createdAt: any;
  reviews: any[];
  rating: number;
  details: DetailServices = new DetailServices();
}
export class EquipmentType {
  _id: string;
  name: string;
  icon: string;
  items: any[];
  description: string;
}
export class Service {
  _id: string;
  name: string;
  price: number = 0;
  owner: any;
  type: any;
  image: any;
  images: any[] = [];
  description: string;
  position: any;
  isAvailable: boolean;
  createdAt: any;
  reviews: any[];
  rating: number;
  country: string;
  details: DetailServices = new DetailServices();
}
export class ServiceType {
  _id: string;
  name: string;
  icon: string;
  items: any[];
  description: string;
}
export class Boat {
  _id: string;
  name: string;
  country: string;
  owner: any;
  price: number = 0;
  image: any;
  images: any[];
  description: string;
  isAvailable: boolean;
  createdAt: any;
  position: any;
  type: any;
  reviews: any[];
  rating: number;
  details: BoatDetails = new BoatDetails();
}

export class Hebergement {
  _id: string;
  name: string;
  owner: any;
  country: string;
  image: any;
  images: any[] = [];
  description: string;
  isAvailable: boolean;
  adress: string;
  price: number = 0;
  position: any;
  createdAt: any;
  type: any;
  reviews?: any[];
  rating: number;
  details: BoatDetails = new BoatDetails();
}

export class HebergementType {
  _id: string;
  name: string;
  icon: string;
  description: string;
  items: any[];
}

export class BoatType {
  _id: string;
  name: string;
  icon: string;
  description: string;
  cat: any;
  items: any[];
}

export class BoatDetails {
  capacity: number = 0;
  size: number = 0;
  port: any;
  lits: number = 0;
  cuisines: number = 0;
  salleDeBain: number = 0;
  smokingAllowed: boolean = false;
  alcoholAllowed: boolean = false;
  partyAllowed: boolean = false;
  equipmentIncluded: boolean = false;
  chauffage: boolean = false;
  parking: boolean = false;
  jardin: boolean = false;
  internet: boolean = false;
  meuble: boolean = false;
  piscine: boolean = false;
  barbecue: boolean = false;
  espaceRepasEnPleinAir: boolean = false;
  wifi: boolean = false;
  television: boolean = false;
  laveLinge: boolean = false;
  climatisation: boolean = false;
}

export class DetailServices {
  capacity: number = 0;
  size: number = 0;
  smokingAllowed: boolean = false;
  alcoholAllowed: boolean = false;
  partyAllowed: boolean = false;
  equipmentIncluded: boolean = false;
  chauffage: boolean = false;
  parking: boolean = false;
  jardin: boolean = false;
  internet: boolean = false;
}
