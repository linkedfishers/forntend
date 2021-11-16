import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CartItem,
  cartItemDetail,
} from 'src/app/interfaces/cart-items.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import ProductService from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

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
    private productService: ProductService,
    private toast: ToastrService,
    private orderService: OrderService
  ) {}
  readonly API: string = environment.apiUrl + '/';

  cartCount = 0;

  ngOnInit(): void {
    this._getCartDetails();
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.items.length ?? 0;
    });
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((res) => {
      this.cartItemDetail = [];
      this.cartCount = res?.items.length ?? 0;
      console.log(res.items);

      res.items.forEach((cartItem) => {
        this.orderService
          .getProduct(cartItem.productId)
          .subscribe((resproduct) => {
            this.cartItemDetail.push({
              product: resproduct.data,
              quantity: cartItem.quantity,
            });
          });
      });
      console.log(this.cartItemDetail);
    });
  }

  backToShop() {
    this.router.navigate(['/marketplace/products-list']);
  }

  deleteCartItem(cartItem: cartItemDetail) {
    this.cartService.deleteCartItem(cartItem.product._id);
    this.toast.warning('Your Product was Deleted');
  }
  updateCartItem(event, cartItem: cartItemDetail) {
    console.log(event);
    this.cartService.setCartItem(
      {
        productId: cartItem.product.product._id,
        quantity: event.target.value,
      },
      true
    );
  }
}
