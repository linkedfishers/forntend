import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OrderItem } from 'src/app/interfaces/orderItems.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import ProductService from 'src/app/services/product.service';

@Component({
  selector: 'app-order-check',
  templateUrl: './order-check.component.html',
  styleUrls: ['./order-check.component.scss'],
})
export class OrderCheckComponent implements OnInit {
  endSub$: Subject<any> = new Subject();
  totalPrice: number;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getSummery();
  }
  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }
  getSummery() {
    this.cartService.cart$.pipe(takeUntil(this.endSub$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.orderService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              console.log(product.data.product.price);
              this.totalPrice += product.data.product.price * item.quantity;
            });
        });
      }
    });
  }
  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
