import { Component, OnInit } from '@angular/core';
import { IpServiceService } from 'src/app/services/ip-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-visiteguider',
  templateUrl: './visiteguider.component.html',
  styleUrls: ['./visiteguider.component.scss'],
})
export class VisiteguiderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
