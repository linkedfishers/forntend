import { OrderItem } from './orderItems.interface';

export class Order {
  _id?: string;
  orderItems?: any[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status: number;
  totalPrice?: string;
  user?: any;
  dateOfOrder?: string;
}
