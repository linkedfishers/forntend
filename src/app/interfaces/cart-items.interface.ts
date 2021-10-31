import { Product } from './product.interface';

product: Product;

export class Cart {
  items?: CartItem[];
}

export class CartItem {
  productId?: string;
  quantity?: number;
}

export class cartItemDetail {
  product?: any;
  quantity?: number;
}
