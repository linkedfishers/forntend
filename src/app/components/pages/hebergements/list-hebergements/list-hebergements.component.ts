import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;

@Component({
  selector: 'app-list-hebergements',
  templateUrl: './list-hebergements.component.html',
  styleUrls: ['./list-hebergements.component.scss'],
})
export class ListHebergementsComponent implements OnInit {
  constructor(
    private equipementService: EquipmentService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
  }
  readonly API: string = environment.apiUrl + '/';
  searchKeyword: string;
  searchedProduct: Hebergement[] = [];
  hebergements: Hebergement[];
  visiblehebrgements: Hebergement[];
  content: Hebergement[] = [];
  formData: FormData;
  form: FormGroup;
  imgaes: any;
  catList: any;
  catId: any;
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
    initPopups();
    initSidebar();
    initForm();
    loadSvg();
    this.equipementService.getHebergements().subscribe((res) => {
      this.hebergements = res.data;
      this.visiblehebrgements = this.hebergements;
    });

    this.equipementService.getHebergementTypes().subscribe((res) => {
      this.catList = res.data;
      console.log(this.catList);
    });
  }

  getAllHebergementList = () => {
    this.equipementService.getHebergements().subscribe((res) => {
      return (this.hebergements = res.data);
    });
  };

  getProli($event) {
    this.catId = $event.target.id;
    this.equipementService
      .getHebergementsByType(this.catId)
      .subscribe((res) => {
        this.hebergements = [];
        this.hebergements = res.data;
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
    this.equipementService
      .searchHebergement(this.searchKeyword)
      .subscribe((res) => {
        console.log(res);
        this.searchedProduct = res.data;
      });
  }
  updatePriceFilter() {
    this.hebergements = this.hebergements.filter((product) => {
      return product.price <= this.maxPrice && product.price >= this.minPrice;
    });
  }

  applySortFilters() {
    this.visiblehebrgements = this.hebergements.sort((p1, p2) => {
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
