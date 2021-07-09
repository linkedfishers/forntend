import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/interfaces/equipments.interface';
import { Review } from 'src/app/interfaces/reviews.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
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
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss'],
})
export class DetailsServiceComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService
  ) {}
  readonly API: string = environment.apiUrl + '/';
  service: Service;
  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = false;
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.equipmentService.getServie(id).subscribe((response) => {
        console.log(response);
        this.service = response.data.boat;
        this.isOwner = response.data.isOwner;
        this.service.reviews = this.service.reviews || [];
        this.service.owner.reviews = this.service.owner.reviews || [];
        this.service.owner.rating = this.service.owner.rating || 0;
      });
    });
    initContent();
  }
  addReview() {
    this.newReview['service'] = this.service;
    this.equipmentService.addReview(this.newReview, 'boat').subscribe(
      (response) => {
        const review = response.data as Review;
        review.author = this.currentUser;
        this.service.reviews.push(review);
        this.newReview = new Review();
        this.toastr.success('Added review', '', {
          positionClass: 'toast-bottom-center',
        });
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
