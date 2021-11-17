import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { OrderItem } from 'src/app/interfaces/orderItems.interface';

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
  userId: string;
  countries = [];
  constructor(private router: Router, private formBuider: FormBuilder) {}

  ngOnInit(): void {
    this._getCountires();
    this._initCheckoutForm();
  }

  private _initCheckoutForm() {
    this.checkouFormGroup = this.formBuider.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
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
  }

  get chekoutForm() {
    return this.checkouFormGroup.controls;
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }
  checkoutFormGroup() {}
}
