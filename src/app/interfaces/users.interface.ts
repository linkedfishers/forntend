import { Review } from "./reviews.interface";

export class User {
  _id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  googleId: string;
  slug: string;
  email: string;
  phone: string;
  adress: string;
  birthDate: Date;
  sex: string;
  password: string;
  token: string;
  profilePicture: string;
  coverPicture: string;
  coverPictures: [string];
  description: string;
  language: string;
  job: string;
  facebook: string;
  instagram: string;
  website: string;
  youtube: string;
  following: any[];
  followers: any[];
  pictures: [string];
  country: string;
  wishList: any[];
  specialities: string[];
  role: string;
  createdAt: any;
  reports: Report[];
  activated: boolean;
  reviews: Review[];
  rating: number;
}

export class Report {
  _id: string;
  type:string;
  cause: string;
  author: string;
  createdAt: any;
  is_done: boolean;
  target_id:string;
}
