import { Component, OnInit } from '@angular/core';
import * as data from "../../../interfaces/countries.json";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.scss']
})
export class ProviderLoginComponent implements OnInit {

  constructor(
    private providerAuth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,

  ) { }
  email: string;
  password: string;
  loading = false;
  loggedIn = false;
  showLogin = true;
  countries = (<any>data).default || [];
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      companyName: [null, [Validators.required]],
      companyAdress: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
      country: ['TN', [Validators.required]],
    }, { updateOn: 'blur' });
  }

  login() {
    this.loading = true;
    this.providerAuth.authenticateAsProvider(this.email, this.password)
      .subscribe(
        response => {
          this.loading = false;
          this.toastr.success('Login Successful!', response.message);
          this.router.navigate(['/provider/add-product']);
        },
        error => {
          this.loading = false;
          this.toastr.error("Can't login!", error.error.message);
        }
      );
  }
  signUp() {
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }

    if (this.signUpForm.invalid) {
      this.toastr.error("Verify your inputs!");
      return;
    }
    this.providerAuth.signUpAsProvider({
      'companyName': this.signUpForm.controls.companyName.value,
      'companyAdress': this.signUpForm.controls.companyAdress.value,
      'email': this.signUpForm.controls.email.value,
      'phone': this.signUpForm.controls.phone.value,
      'password': this.signUpForm.controls.password.value,
      'country': this.signUpForm.controls.country.value
    })
      .subscribe(
        response => {
          Swal.fire({
            title: 'Provider request sent!',
            icon: 'info'
          });
          this.signUpForm.reset();
        },
        err => {
          this.toastr.error(err.error.message);
        }
      )
  }

}
