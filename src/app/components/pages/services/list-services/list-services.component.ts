import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service, ServiceType } from 'src/app/interfaces/equipments.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var initForm, $: any;
declare var initSidebar, initPopups: any;


import { Boat, BoatType } from 'src/app/interfaces/equipments.interface';

import { Options, LabelType } from '@angular-slider/ngx-slider';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import * as countriesLib from 'i18n-iso-countries';

declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
declare const require;
@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
  }

  readonly API: string = environment.apiUrl + '/';
  searchKeyword: string;
  countries = [];

  searchedProduct: Boat[] = [];
  services: Service[];
  countryName: string;
  countryName2: string;
  serviceTypes: ServiceType[];
  visibleservices: Service[];
  formData: FormData;
  form: FormGroup;
  content: Service[] = [];
  ServiceL: Service[];
  catId: string;
  catList: ServiceType[];
  images: any;

  minPrice: number = 0;
  maxPrice: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' Dt';
        case LabelType.High:
          return value + ' Dt';
        default:
          return value + ' Dt';
      }
    },
  };

  filterBy = 'price';
  orderBy = 1;

  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.equipmentService.getServices().subscribe((res) => {
      this.services = res.data;

      console.log(this.services);
    });
    this.equipmentService.getServiceTypes().subscribe((res) => {
      this.serviceTypes = res.data;
        console.log("service lists types",this.serviceTypes);
    });
    this.equipmentService.getServiceTypes().subscribe((res) => {
      this.catList = res.data;
    });
    this._getCoutries();
  }

  private _getCoutries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
    console.log(this.countries);
  }

  search() {
    if (!this.countryName) return;
    const countryName2 =
      this.countryName.charAt(0).toUpperCase() + this.countryName.slice(1);
    console.log(countryName2);
    this.equipmentService.searchBoat(countryName2).subscribe((res) => {
      this.services = res.data;
      console.log('heelo test', this.services);
    });
  }

  getAllProducts = () => {
    this.equipmentService.getServices().subscribe((res) => {
      return (this.services = res.data);
    });
  };

  /* ********* test for the product List */

  getProdLi($event) {
    this.catId = $event.target.id;
    this.equipmentService.getBoatsByType(this.catId).subscribe((res) => {
      this.services = [];
      this.services = res.data;
      console.log(this.services);
    });
  }

  /* ********************* */

  getProlist($event) {
    this.route.params.subscribe((params) => {
      this.catId = $event.target.id;
      this.equipmentService.getServicessByType(this.catId).subscribe((res) => {
        this.ServiceL = res.data;
        if (this.ServiceL.length == 0) {
          return this.services;
        } else {
          this.services = [];
        }

        console.log(this.ServiceL);
      });
    });
  }

  onCbChange(e) {
    const isArray: FormArray = this.form.get('isArray') as FormArray;

    if (e.target.checked) {
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onSubmit() {
    console.log(this.form.value);
  }
  searchProduct() {
    if (!this.searchKeyword) return;
    this.equipmentService.searchBoat(this.searchKeyword).subscribe((res) => {
      console.log(res);
      this.searchedProduct = res.data;
    });
  }

  updatePriceFilter() {
    this.services = this.services.filter((product) => {
      return product.price <= this.maxPrice && product.price >= this.minPrice;
    });
  }

  applySortFilters() {
    this.visibleservices = this.services.sort((p1, p2) => {
      switch (this.filterBy) {
        case 'price':
          return (p1.price - p2.price) * this.orderBy;
        case 'createdAt':
          return (
            (new Date(p1.createdAt).getTime() -
              new Date(p2.createdAt).getTime()) *
            this.orderBy
          );
        default:
          break;
      }
    });
  }
}
