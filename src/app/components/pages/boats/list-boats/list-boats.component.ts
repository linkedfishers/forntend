import { Component, OnInit } from '@angular/core';
import { Boat, BoatType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-list-boats',
  templateUrl: './list-boats.component.html',
  styleUrls: ['./list-boats.component.scss'],
})
export class ListBoatsComponent implements OnInit {
  constructor(private equipmentService: EquipmentService) {}

  readonly API: string = environment.apiUrl + '/';

  boats: Boat[];
  boatTypes: BoatType[];
  visiblebotas: Boat[];
  content: Boat[] = [];
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.equipmentService.getBoats().subscribe((res) => {
      this.boats = res.data;
      /* console.log(this.boats); */
    });
    this.equipmentService.getServiceTypes().subscribe((res) => {
      this.boatTypes = res.data;
     /*  console.log(this.boatTypes); */
    });
  }
}
