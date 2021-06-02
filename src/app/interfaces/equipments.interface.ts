export class Equipment {
    _id: string;
    name: string;
    price: number;
    owner: any;
    type: any;
    image: string;
    description: string;
    position: any;
    isAvailable: boolean;
    createdAt: any;
    reviews: any[];
    rating: number;
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
    price: number;
    owner: any;
    type: any;
    image: string;
    description: string;
    position: any;
    isAvailable: boolean;
    createdAt: any;
    reviews: any[];
    rating: number;
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
    owner: any;
    price: number;
    image: string;
    description: string;
    isAvailable: boolean;
    createdAt: any;
    position: any;
    type: any;
    reviews: any[];
    rating: number;
}

export class Hebergement {
    _id: string;
    name: string;
    owner: any;
    image: string;
    description: string;
    isAvailable: boolean;
    adress: string;
    price: number;
    position: any;
    createdAt: any;
    type: any;
    reviews: any[];
    rating: number;
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
    items: any[];
}

