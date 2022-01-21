import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-visiteguider',
  templateUrl: './visiteguider.component.html',
  styleUrls: ['./visiteguider.component.scss'],
})

export class VisiteguiderComponent implements OnInit {
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res) => {

          

    });
  }
}
