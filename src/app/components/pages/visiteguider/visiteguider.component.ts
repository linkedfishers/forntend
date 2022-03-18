import { Component, OnInit } from '@angular/core';
import { IpServiceService } from 'src/app/services/ip-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-visiteguider',
  templateUrl: './visiteguider.component.html',
  styleUrls: ['./visiteguider.component.scss'],
})
export class VisiteguiderComponent implements OnInit {
  constructor(private router: Router, viewportScroller: ViewportScroller) {}

  

  ngOnInit(): void {
    AOS.init();
  }





  navigate = () => this.router.navigate(['/acceuil'], { fragment: 'team' });
}
