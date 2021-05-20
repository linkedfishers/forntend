export class Equipment {
    _id: string;
    name: string;
    price: number;
    owner: any;
    type: any;
    image: string;
    description: string;
    isAvailable: boolean;
    createdAt: any;
}
export class EquipmentType {
    _id: string;
    name: string;
    icon: string;
    items: any[];
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
}

export class Reservation {
    _id: string;
    reservedBy: any
    home: any
    dateStart: Date
    dateEnd: Date
}