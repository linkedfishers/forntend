import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/reviews.interface';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from 'src/app/services/reservation.service';
import { IpServiceService } from 'src/app/services/ip-service.service';
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
  selector: 'app-details-boat',
  templateUrl: './details-boat.component.html',
  styleUrls: ['./details-boat.component.scss'],
})
export class DetailsBoatComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private reservationService: ReservationService,
    private changeSrevice: IpServiceService
  ) {}
  readonly API: string = environment.apiUrl + '/';

  boat: Boat;
  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = false;
  images: any;
  image: any;
  price: Number;
  res: any;
  restwo: any;
  changeCurrency: any;
  code: any;
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.equipmentService.getBoat(id).subscribe((response) => {
        console.log(response);
        this.boat = response.data.boat;
        this.isOwner = response.data.isOwner;
        this.images = response.data.boat.images;
        this.image = response.data.boat.image;
        console.log(this.image);
        console.log(this.images);
        this.boat.reviews = this.boat.reviews || [];
        this.boat.owner.reviews = this.boat.owner.reviews || [];
        this.boat.owner.rating = this.boat.owner.rating || 0;
      });
    });
    initContent();
    this.changeSrevice.getIpAdresse().subscribe((res) => {
      this.res = res;
      console.log(this.res);
      setTimeout(() => {
        this.changeSrevice.getGEOLocation(this.res.ip).subscribe((res) => {
          this.restwo = res;
          this.code = this.restwo.currency.code;
          this.changeSrevice.getCurrencyData(this.code).subscribe((res2) => {
            console.log(res2);

            this.changeCurrency = res2.rates[this.code].rate;

            if (this.changeCurrency && this.code) {
              this.price =
                Math.round(this.boat.price * this.changeCurrency * 100) / 100;
            } else {
              this.price = this.boat.price;
              this.code = 'TND';
            }
            return this.price;
          });
        });
      }, 1000);
    });
  }

  addReview() {
    this.newReview['boat'] = this.boat;
    this.equipmentService.addReview(this.newReview, 'boat').subscribe(
      (response) => {
        const review = response.data as Review;
        review.author = this.currentUser;
        this.boat.reviews.push(review);
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
