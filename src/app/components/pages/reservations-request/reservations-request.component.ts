import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  areIntervalsOverlapping,
  differenceInDays,
  isPast,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { colors } from 'src/app/services/utils';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/users.interface';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-reservations-request',
  templateUrl: './reservations-request.component.html',
  styleUrls: ['./reservations-request.component.scss'],
})
export class ReservationsRequestComponent implements OnInit {
 
  reservations: Reservation[] = [];
  pendingReservations: Reservation[] = [];
  requestedReservations: Reservation[] = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  displayedReservations: CalendarEvent[] = [];

  newReservation: Reservation = new Reservation();

  activeDayIsOpen: boolean = false;

  showSpinner = false;
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  id: string;
  category: string = 'boat';
  categoriesList: string[] = ['boat', 'home', 'equipment', 'service'];
  totalPrice = 0;
  item: any;
  currentUser: User;
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.category = params.type;
      if (!this.categoriesList.includes(this.category)) {
        //redirect 404
        this.router.navigateByUrl('404');
      }
      this.newReservation[this.category] = this.id;
      this.reservationService
        .getReservationsByCategory(this.id, this.category)
        .subscribe((response) => {
          this.reservations = response.data.reservations;
          this.requestedReservations = response.data.pendingReservations;
          this.item = response.data.item;
          for (let i = 0; i < this.reservations.length; i++) {
            let color = colors.red;
            let title = 'Booked';
            if (
              (this.reservations[i].reservedBy as unknown as string) ==
              this.currentUser._id
            ) {
              color = colors.green;
              title += ' by you';
            }
            this.displayedReservations.push({
              start: new Date(this.reservations[i].dateStart),
              end: new Date(this.reservations[i].dateEnd),
              title: title,
              color: color,
              allDay: true,
            });
          }
          this.refresh.next();
        });
      this.reservationService
        .getMyPendingReservations(this.id, this.category)
        .subscribe((response) => {
          this.pendingReservations = response.data;
          for (let i = 0; i < this.pendingReservations.length; i++) {
            this.displayedReservations.push({
              start: new Date(this.pendingReservations[i].dateStart),
              end: new Date(this.pendingReservations[i].dateEnd),
              title: 'Pending reservation',
              color: colors.yellow,
              allDay: true,
            });
          }
          this.refresh.next();
        });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createReservationRequest() {
    for (let i = 0; i < this.reservations.length; i++) {
      const reservation = this.reservations[i];
      if (
        areIntervalsOverlapping(
          {
            start: new Date(this.newReservation.dateStart),
            end: new Date(this.newReservation.dateEnd),
          },
          {
            start: new Date(reservation.dateStart),
            end: new Date(reservation.dateEnd),
          }
        )
      ) {
        this.toastr.warning(
          'Ces dates ne sont pas disponibles',
          'Those dates are not available'
        );
        return;
      }
    }
    this.showSpinner = true;
    this.reservationService.createReservation(this.newReservation).subscribe(
      (response) => {
        const reservation: Reservation = response.data;
        console.log(response.data);

        this.displayedReservations.push({
          start: new Date(reservation.dateStart),
          end: new Date(reservation.dateEnd),
          title: 'Pending reservation',
          color: colors.yellow,
          allDay: true,
        });
        this.refresh.next();
        this.newReservation = new Reservation();
        this.totalPrice = 0;
        this.showSpinner = false;
        this.toastr.success('Request a reservation');
      },
      (error) => {
        this.toastr.error(error.error.message);
        this.showSpinner = false;
      }
    );
  }

  updatePrice() {
    if (!this.newReservation.dateStart || !this.newReservation.dateEnd) {
      this.totalPrice = 0;
      return;
    }
    const endDate = new Date(this.newReservation.dateEnd);
    const startDate = new Date(this.newReservation.dateStart);
    if (isPast(startDate) || isPast(startDate)) {
      this.totalPrice = 0;
      this.toastr.warning('Please choose a valid date range');
      return;
    }
    let numberOfdays = differenceInDays(endDate, startDate);
    if (numberOfdays <= 0) {
      this.totalPrice = 0;
      this.toastr.warning('Please choose a valid date range');
      return;
    }
    this.totalPrice = numberOfdays * this.item.price;
  }

  updateReservation(i: number, status: string) {
    let reservation = this.requestedReservations[i];
    reservation.status = status;
    this.reservationService
      .updateReservation(reservation)
      .subscribe((response) => {
        console.log(response);
        this.requestedReservations.splice(i, 1);
        reservation = response.data;
        if (reservation.status == 'CONFIRMED') {
          this.displayedReservations.push({
            start: new Date(reservation.dateStart),
            end: new Date(reservation.dateEnd),
            title: 'Booked',
            color: colors.red,
            allDay: true,
          });
          this.refresh.next();
        }
        this.toastr.success('updated reservation');
      });
  }
}
