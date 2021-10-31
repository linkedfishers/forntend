import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart-items.interface';
export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() {}

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const initCart = {
        items: [],
      };
      const initalCartJson = JSON.stringify(initCart);
      localStorage.setItem(CART_KEY, initalCartJson);
    }
  }
  //feshing Item from Local Storage
  getCart(): Cart {
    const cartJdonString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJdonString);
    return cart;
  }

  //update carItem object depanding on quantity and selected product
  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  
  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId != productId);
    cart.items = newCart;
    const cartjsonstring = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartjsonstring);
    this.cart$.next(cart);
  }
}
