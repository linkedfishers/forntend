import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/interfaces/event.interface';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/reviews.interface';
import { ToastrService } from 'ngx-toastr';
declare var app, loadSvg, initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader, loadSvg: any;

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.scss']
})
export class DetailsEventsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private eventService: EventService,
    private toastr: ToastrService,
  ) { }
  readonly API: string = environment.apiUrl + '/';
  event: Event;

  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = true;
  isGoing = false;
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.eventService.getEventById(id).subscribe((response) => {
        this.event = response.data;
        console.log(this.event);
        this.isOwner = this.event.host._id === this.currentUser._id;
        this.isGoing = this.event.going.includes(this.currentUser._id);
      })
    });
    initContent();
  }


  toggleGoing() {
    console.log('houni');
    this.eventService.addGoing(this.event._id, !this.isGoing).subscribe(
      (response) => {
        this.event = response.data;
        this.isGoing = this.event.going.includes(this.currentUser._id);
      }, error => {
        console.log(error);
      });
  }

}




