import { Component, OnInit } from '@angular/core';
import {
  Equipment,
  EquipmentType,
} from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/interfaces/reviews.interface';
declare var app, loadSvg, initPopups, initContent, loadSvg: any;
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;

@Component({
  selector: 'app-details-equipment',
  templateUrl: './details-equipment.component.html',
  styleUrls: ['./details-equipment.component.scss'],
})
export class DetailsEquipmentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService
  ) {}
  readonly API: string = environment.apiUrl + '/';
  equipment: Equipment;
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
      this.equipmentService.getEquipment(id).subscribe((response) => {
        
        this.equipment = response.data.equipment;
        this.isOwner = response.data.isOwner;
        this.equipment.reviews = this.equipment.reviews || [];
        console.log(this.equipment.reviews);

        this.equipment.owner.reviews = this.equipment.owner.reviews || [];
        this.equipment.owner.rating = this.equipment.owner.rating || 0;
      });
    });
    initContent();
  }
  addReview() {
    this.newReview['equipment'] = this.equipment;
    this.equipmentService.addReview(this.newReview, 'equipment').subscribe(
      (response) => {
        const review = response.data as Review;
        review.author = this.currentUser;
        this.equipment.reviews.push(review);
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
