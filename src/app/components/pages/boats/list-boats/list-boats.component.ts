import { Component, OnInit } from '@angular/core';
import { Boat, BoatType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-list-boats',
  templateUrl: './list-boats.component.html',
  styleUrls: ['./list-boats.component.scss'],
})
export class ListBoatsComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  readonly API: string = environment.apiUrl + '/';

  boats: Boat[];
  boatTypes: BoatType[];
  visiblebotas: Boat[];
  content: Boat[] = [];
  boatL: Boat[];
  catId: string;
  catList: BoatType[];
  images: any;
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
}
