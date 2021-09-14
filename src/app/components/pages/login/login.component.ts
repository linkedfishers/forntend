import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { User } from 'src/app/interfaces/users.interface';
import { DatePipe } from '@angular/common';
import * as data from "../../../interfaces/countries.json";





declare var initForm: any;
declare var initLoginTabs: any;
declare var loadSvg: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  countries = (<any>data).default || [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private socialAuthService: SocialAuthService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    initForm();
    initLoginTabs();
    loadSvg();
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      remember: new FormControl(true)
    }, { updateOn: 'blur' });

    this.signUpForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      //Password pattern : 
      //Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      lastName: [null, [Validators.required]],
      firstName : [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      country: [null, [Validators.required]],
    }, { updateOn: 'blur' });
  }


  login() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.invalid) {
      this.toastr.error("Verify your inputs!");
      return;
    }
    this.authService.authenticate(this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
      .subscribe(res => {
        this.toastr.success('Login Successful!', res.message);
        this.router.navigate(['/']);
      }, (err: any) => {
        if (err.error.message == 'Email not verified') {
          this.toastr.warning('Verify your email adress!');
          return;
        }
        this.toastr.error("Can't login!", err.error.message);
      });
  }

  signUp() {
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }

    if (this.signUpForm.invalid) {
      if (this.signUpForm.controls?.checkPassword?.errors?.confirm) {
        this.toastr.error("Passwords does not match!");
        return;
      }
      this.toastr.error("Verify your inputs!");
      return;
    }
    this.authService.signUp({
      'email': this.signUpForm.controls.email.value,
      'password': this.signUpForm.controls.password.value,
      'firstName': this.signUpForm.controls.firstName.value,
      'lastName': this.signUpForm.controls.lastName.value,
      'birthDate': this.formatDate(this.signUpForm.controls.birthDate.value),
      'country': this.signUpForm.controls.country.value
    })
      .subscribe(
        response => {
          Swal.fire({
            title: this.translate.instant('verification_email_sent'),
            icon: 'info'
          });
          this.signUpForm.reset();
        },
        err => {
          this.toastr.error(err.error.message);
        }
      )
  }

  formatDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) => {
        let user: User = {
          googleId: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          profilePicture: response.photoUrl,
          fullName: response.name,
          email: response.email
        } as User
        this.authService.authenticateWithGoogle(user).subscribe(res => {
          this.toastr.success('Login Successful!', res.message);
          this.router.navigate(['/']);
        }, (err: any) => {
          this.toastr.error("Can't login!", err.error.message);
        });
      });
  }

}
