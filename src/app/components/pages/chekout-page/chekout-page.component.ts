import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { Cart } from 'src/app/interfaces/cart-items.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderItem } from 'src/app/interfaces/orderItems.interface';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ORDER_STATUS } from '../order-details/orderConstant';
import { map } from 'rxjs/operators';
import { EquipmentService } from 'src/app/services/equipment.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const require;
@Component({
  selector: 'app-chekout-page',
  templateUrl: './chekout-page.component.html',
  styleUrls: ['./chekout-page.component.scss'],
})
export class ChekoutPageComponent implements OnInit {
  checkouFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: any;
  currentUser: User;
  countries = [];
  constructor(
    private router: Router,
    private formBuider: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
    this.userId = this.currentUser._id;
    console.log(typeof this.userId);

    this._getCountires();
    this._getCartItems();
    this._initCheckoutForm();
  }
  _getCartItems() {
    const cart: Cart = this.cartService.getCart();

    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    }); /* cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      }; */
    /* }); */
    console.log(this.orderItems);
  }
  private _initCheckoutForm() {
    this.checkouFormGroup = this.formBuider.group({
      name: ['hamza', Validators.required],
      email: ['a@gmail.com', [Validators.email, Validators.required]],
      phone: ['99999', Validators.required],
      city: ['TUNIS', Validators.required],
      country: ['' /* , Validators.required */],
      zip: ['123', Validators.required],
      apartment: ['azz', Validators.required],
      street: ['aze', Validators.required],
    });
  }

  private _getCountires() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    /*     console.log(countriesLib.getName('US', 'en', { select: 'official' })); // United States of America
     */
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
    console.log(this.countries);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkouFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.chekoutForm.street.value,
      shippingAddress2: this.chekoutForm.apartment.value,
      city: this.chekoutForm.city.value,
      zip: this.chekoutForm.zip.value,
      country: this.chekoutForm.country.value,
      phone: this.chekoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOfOrder: `${Date.now()}`,
    };
    this.equipmentService.createOrder(order).subscribe(() => {
      const url = 'https://sandbox.paymee.tn/api/v1/payments/create';
      let body = JSON.stringify({
        vendor: 2102,
        ammount: order.totalPrice,
        note: 'Order #1000132',
      });
      const headers = new HttpHeaders({
        Authorization: 'Token b5b60a5ecec5f0262d6cb47ea17124e945326d90',
        'Content-Type': 'application/json; charset=utf-8',
      });

      this.httpClient
        .post(url, body, {
          headers: headers,
        })
        .subscribe((data) => {
          console.log(data);
        });
      console.log('succefully added');
    });
  }

  get chekoutForm() {
    return this.checkouFormGroup.controls;
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }
  checkoutFormGroup() {}
}
