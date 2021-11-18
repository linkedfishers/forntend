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
  userId = '6171dac1fa64e6405c08ca15';
  countries = [];
  constructor(
    private router: Router,
    private formBuider: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this._getCountires();
    this._getCartItems();
    this._initCheckoutForm();
  }
  _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    console.log('test-hamza');

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
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['' /* , Validators.required */],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
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
      //redirect to thank you page // to payment page
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
