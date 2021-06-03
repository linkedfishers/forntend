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
        console.log(this.reservationRequests);
        this.reservationRequests.forEach(
          (reservation) => {
            if (reservation.boat) {
              reservation.item = reservation.boat
              reservation.item.category = 'boat';
            } else if (reservation.home) {
              reservation.item = reservation.home
              reservation.item.category = 'home';
            } if (reservation.service) {
              reservation.item = reservation.service
              reservation.item.category = 'service';
            } if (reservation.equipment) {
              reservation.item = reservation.equipment
              reservation.item.category = 'equipment';
            }
            reservation.numberOfDays = differenceInDays(new Date(reservation.dateEnd), new Date(reservation.dateStart));
          }
        );
      }
    )
  }

}
