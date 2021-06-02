import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

@Component({
  selector: 'app-reservations-request',
  templateUrl: './reservations-request.component.html',
  styleUrls: ['./reservations-request.component.scss']
})
export class ReservationsRequestComponent implements OnInit {


  reservations: Reservation[] = [];
  pendingReservations: Reservation[] = [];
  requestedReservations: Reservation[] = [];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  displayedReservations: CalendarEvent[] = [];

  newReservation: Reservation = new Reservation();

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  id: string;
  category: string = 'boat';
  categoriesList: string[] = ['boat', 'home', 'equipment', 'service'];
  totalPrice = 0;
  item: any;
  currentUser: User;
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.category = params.type;
      if (!this.categoriesList.includes(this.category)) {
        //redirect 404
        this.router.navigateByUrl('404');
      }
      this.newReservation[this.category] = this.id;
      this.reservationService.getReservationsByCategory(this.id, this.category).subscribe(
        (response) => {
          this.reservations = response.data.reservations;
          this.requestedReservations = response.data.pendingReservations;
          this.item = response.data.item;
          for (let i = 0; i < this.reservations.length; i++) {
            let color = colors.red;
            let title = 'Booked';
            if (this.reservations[i].reservedBy as unknown as string == this.currentUser._id) {
              color = colors.green;
              title += ' by you';
            }
            this.displayedReservations.push(
              {
                start: new Date(this.reservations[i].dateStart),
                end: new Date(this.reservations[i].dateEnd),
                title: title,
                color: color,
                allDay: true,
              }
            )
          }
          this.refresh.next();
        }
      );
      this.reservationService.getMyPendingReservations(this.id, this.category).subscribe(
        (response) => {
          this.pendingReservations = response.data;
          for (let i = 0; i < this.pendingReservations.length; i++) {
            this.displayedReservations.push(
              {
                start: new Date(this.pendingReservations[i].dateStart),
                end: new Date(this.pendingReservations[i].dateEnd),
                title: 'Pending reservation',
                color: colors.yellow,
                allDay: true,
              }
            )
          }
          this.refresh.next();
        }
      );
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    //this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createReservationRequest() {
    this.reservationService.createReservation(this.newReservation).subscribe(
      (response) => {
        const reservation: Reservation = response.data;
        this.displayedReservations.push(
          {
            start: new Date(reservation.dateStart),
            end: new Date(reservation.dateEnd),
            title: 'Pending reservation',
            color: colors.yellow,
            allDay: true,
          }
        );
        this.refresh.next();
        this.newReservation = new Reservation();
        this.totalPrice = 0;
        this.toastr.success("Request a reservation");
      }
    )
  }

  updatePrice() {
    if (!this.newReservation.dateStart || !this.newReservation.dateEnd) {
      this.totalPrice = 0;
      return;
    }
    let start = moment(this.newReservation.dateStart);
    let end = moment(this.newReservation.dateEnd);
    let numberOfdays = end.diff(start, 'days');
    if (numberOfdays <= 0) {
      this.totalPrice = 0;
      return;
    }
    this.totalPrice = numberOfdays * this.item.price;
  }

  updateReservation(i: number, status: string) {
    let reservation = this.requestedReservations[i];
    reservation.status = status;
    this.reservationService.updateReservation(reservation).subscribe(
      (response) => {
        console.log(response);
        this.requestedReservations.splice(i, 1);
        reservation = response.data;
        if (reservation.status == "CONFIRMED") {
          this.displayedReservations.push({
            start: new Date(reservation.dateStart),
            end: new Date(reservation.dateEnd),
            title: "Booked",
            color: colors.red,
            allDay: true,
          });
          this.refresh.next();
        }
        this.toastr.success("updated reservation");
      }
    )
  }

}