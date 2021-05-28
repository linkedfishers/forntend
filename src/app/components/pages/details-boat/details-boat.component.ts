import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
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
  selector: 'app-details-boat',
  templateUrl: './details-boat.component.html',
  styleUrls: ['./details-boat.component.scss']
})
export class DetailsBoatComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
  ) { }
  readonly API: string = environment.apiUrl + '/';

  boat: Boat;
  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = true;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.equipmentService.getBoat(id).subscribe((response) => {
        this.boat = response.data;
        this.boat.reviews = this.boat.reviews || [];
        this.isOwner = this.boat.owner._id === this.currentUser._id;
      })
    });
    initContent();
  }

  addReview() {
    this.newReview['boat'] = this.boat;
    this.equipmentService.addReview(this.newReview, 'boat').subscribe(
      (response) => {
        const review = response.data as Review;
        review.author = this.currentUser;
        this.boat.reviews.push(review);
        this.newReview = new Review();
        this.toastr.success("Added review", "", { positionClass: "toast-bottom-center" });
      },
      (error) => {
        this.toastr.error('Error while adding review', error.error.message);
      }
    )
  }

  range(n) {
    if (!n) return Array(0);
    return Array(Math.round(n));
  }
}
