import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/reviews.interface';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private changeSrevice: IpServiceService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  readonly API: string = environment.apiUrl + '/';
  responsiveOptions;
  hebergement: Hebergement;
  currentUser: User;
  reviews: Review[] = [];
  newReview: Review = new Review();
  isOwner = true;
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
      this.equipmentService.getHebergement(id).subscribe((response) => {
        this.hebergement = response.data;
        console.log(this.hebergement);
        this.images = response.data.images;
        console.log(this.images);

        this.hebergement.reviews = this.hebergement.reviews || [];
        this.isOwner = this.hebergement.owner._id === this.currentUser._id;
      });
    });
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
                Math.round(this.hebergement.price * this.changeCurrency * 100) /
                100;
            } else {
              this.price = this.hebergement.price;
              this.code = 'TND';
            }
            return this.price;
          });
        });
      }, 1000);
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
