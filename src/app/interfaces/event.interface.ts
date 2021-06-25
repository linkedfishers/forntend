export class Event {
    _id: string;
    description: string;
    name: string;
    endDate: Date = new Date();
    startDate: Date = new Date();
    host: any;
    likes: any[];
    comments: any;
    position: any;
    going: any[];
    interested: any[];
    tags: string[];
    image: string;
    reviews: any[];
    maximumCapacity: number = 0;
    createdAt: any;
    startTime: Date = new Date();
    endTime: Date = new Date();
}
