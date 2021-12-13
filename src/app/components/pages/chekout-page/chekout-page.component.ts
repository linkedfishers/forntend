import { Component, HostListener, OnInit } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

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
  orders: Order;
  token: string = '';
  cookieValue: string;

  constructor(
    private router: Router,
    private formBuider: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private equipmentService: EquipmentService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private toast: ToastrService
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
      name: [this.currentUser.fullName, Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: [, Validators.required],
      city: ['', Validators.required],
      country: ['' /* , Validators.required */],
      zip: [, Validators.required],
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

  public prepareFrame = (token: string) => {
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute(
      'src',
      `https://sandbox.paymee.tn/gateway/${this.cookieValue}`
    );
    ifrm.style.width = '100%';
    ifrm.style.height = '480px';

    var test = document.querySelector('.frame');
    test.appendChild(ifrm);
  };

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

    this.equipmentService.createOrder(order).subscribe((res) => {
      this.token = res.data.token;
      console.log(res);

      this.cookieService.set('tokenPay', this.token, {
        sameSite: 'None',
        secure: true,
      });
      this.cookieValue = this.cookieService.get('tokenPay');
      this.prepareFrame(this.cookieValue);

      window.addEventListener(
        'message',
        (event) => {
          if (event.data.event_id === 'paymee.complete') {
            this.toast.success(
              'Your Payment was successfully completed',
              'By Linkedfishers',
              {
                timeOut: 5000,
                positionClass: 'toast-bottom-center',
              }
            );
            window.location.replace('/marketplace/products-list');
          } else {
            this.toast.warning('you payment not complete', 'By Linkedfishers', {
              timeOut: 5000,
              positionClass: 'toast-bottom-center',
            });
            window.location.replace('/checkout');
          }
        },
        false
      );
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
