import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/reviews.interface';
import { ToastrService } from 'ngx-toastr';

declare var app,
  loadSvg,
  initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader,
  loadSvg: any;
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;

@Component({
  selector: 'app-details-hebergements',
  templateUrl: './details-hebergements.component.html',
  styleUrls: ['./details-hebergements.component.scss'],
})
export class DetailsHebergementsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService
  ) {}
  readonly API: string = environment.apiUrl + '/';

  hebergement: Hebergement;
  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = true;

  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.equipmentService.getHebergement(id).subscribe((response) => {
        this.hebergement = response.data;
        this.hebergement.reviews = this.hebergement.reviews || [];
        this.isOwner = this.hebergement.owner._id === this.currentUser._id;
      });
    });
    initContent();
  }

  addReview() {
    this.newReview['hebergement'] = this.hebergement._id;
    this.equipmentService.addReview(this.newReview, 'hebergement').subscribe(
      (response) => {
        const review = response.data as Review;
        review.author = this.currentUser;
        this.hebergement.reviews.push(review);
        this.newReview = new Review();
        this.toastr.info('Added review');
      },
      (error) => {
        this.toastr.error('Error while adding review', error.error.message);
      }
    );
  }

  range(n) {
    if (!n) return Array(0);
    return Array(Math.round(n));
  }
}
