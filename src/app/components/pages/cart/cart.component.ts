import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItemDetail } from 'src/app/interfaces/cart-items.interface';
import { CartService } from 'src/app/services/cart.service';
import ProductService from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItemDetail: cartItemDetail[] = [];
  subTotal: number = 0;
  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  cartCount = 0;

  ngOnInit(): void {
    this._getCartDetails();
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.items.length ?? 0;
    });
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((res) => {
      res.items.forEach((cartItem) => {
        this.productService
          .getProduct(cartItem.productId)
          .subscribe((resproduct) => {
            console.log(resproduct);

            this.cartItemDetail.push({
              product: resproduct.data,
              quantity: cartItem.quantity,
            });

            console.log(this.cartItemDetail);
            this.subTotal = resproduct.data.product.price * cartItem.quantity;
            console.log(resproduct.data.product.price);
          });
      });
    });
  }

  backToShop() {
    this.router.navigate(['/marketplace/products-list']);
  }

  deleteCartItem(cartItem: cartItemDetail) {
    console.log('hello');

    this.cartService.deleteCartItem(cartItem.product._id);
  }
}
