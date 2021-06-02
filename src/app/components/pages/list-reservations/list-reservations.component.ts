import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.scss']
})
export class ListReservationsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
  ) { }

  reservationRequests: Reservation[] = [];
  ngOnInit(): void {
    this.reservationService.getOwnerReservations().subscribe(
      (response) => {
        this.reservationRequests = response.data;
        this.reservationRequests.forEach(
          (reservation) => {
            reservation.item = reservation.boat || reservation.home || reservation.service || reservation.equipment;
            let start = moment(reservation.dateStart);
            let end = moment(reservation.dateEnd);
            reservation.numberOfDays = end.diff(start, 'days');
          }
        );
      }
    )
  }

}
