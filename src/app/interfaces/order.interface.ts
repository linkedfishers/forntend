import { OrderItem } from "./orderItems.interface";

export class Order {
  _id?: string;
  orderItem?: OrderItem;
  shippingAdresse1?: string;
  shippingAdresse2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status: number;
  totalPrice?: string;
  user?: string;
  dateOfOrder?: string;
}
