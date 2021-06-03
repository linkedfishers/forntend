import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { differenceInDays } from 'date-fns';
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
            reservation.numberOfDays = differenceInDays(new Date(reservation.dateEnd), new Date(reservation.dateStart));
          }
        );
      }
    )
  }

}
