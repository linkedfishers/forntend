import { Component, OnInit } from '@angular/core';
import { Boat, BoatType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-list-boats',
  templateUrl: './list-boats.component.html',
  styleUrls: ['./list-boats.component.scss'],
})
export class ListBoatsComponent implements OnInit {
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
  boats: Boat[];
  countryName: string;
  countryName2: string;
  boatTypes: BoatType[];
  visiblebotas: Boat[];
  formData: FormData;
  form: FormGroup;
  content: Boat[] = [];
  boatL: Boat[];
  catId: string;
  catList: BoatType[];
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
    this.equipmentService.getBoats().subscribe((res) => {
      this.boats = res.data;

      console.log(this.boats);
    });
    this.equipmentService.getServiceTypes().subscribe((res) => {
      this.boatTypes = res.data;
      /*  console.log(this.boatTypes); */
    });
    this.equipmentService.getBoatTypes().subscribe((res) => {
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
      this.boats = res.data;
      console.log('heelo test', this.boats);
    });
  }

  getAllProducts = () => {
    this.equipmentService.getBoats().subscribe((res) => {
      return (this.boats = res.data);
    });
  };

  /* ********* test for the product List */

  getProdLi($event) {
    this.catId = $event.target.id;
    this.equipmentService.getBoatsByType(this.catId).subscribe((res) => {
      this.boats = [];
      this.boats = res.data;
      console.log(this.boats);
    });
  }

  /* ********************* */

  getProlist($event) {
    this.route.params.subscribe((params) => {
      this.catId = $event.target.id;
      this.equipmentService.getBoatsByType(this.catId).subscribe((res) => {
        this.boatL = res.data;
        if (this.boatL.length == 0) {
          return this.boats;
        } else {
          this.boats = [];
        }

        console.log(this.boatL);
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
    this.boats = this.boats.filter((product) => {
      return product.price <= this.maxPrice && product.price >= this.minPrice;
    });
  }

  applySortFilters() {
    this.visiblebotas = this.boats.sort((p1, p2) => {
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
