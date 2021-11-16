import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chekout-page',
  templateUrl: './chekout-page.component.html',
  styleUrls: ['./chekout-page.component.scss'],
})
export class ChekoutPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  backToCart() {
    this.router.navigate(['/cart']);
  }
  checkoutFormGroup(){
    
  }
}
