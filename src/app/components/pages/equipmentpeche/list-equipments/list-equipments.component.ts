import { Component, OnInit } from '@angular/core';
import {
  Equipment,
  EquipmentType,
} from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-list-equipments',
  templateUrl: './list-equipments.component.html',
  styleUrls: ['./list-equipments.component.scss'],
})
export class ListEquipmentsComponent implements OnInit {
  constructor(private equipementService: EquipmentService) {}
  readonly API: string = environment.apiUrl + '/';

  equipments: Equipment[];
  equipmentType: EquipmentType[];
  visibleequipments: Equipment[];
  content: Equipment[] = [];
  ngOnInit(): void {
    initPopups();
    initSidebar();
    initForm();
    loadSvg();
    this.equipementService.getEquipments().subscribe((res) => {
      this.equipments = res.data;
   
    });
    this.equipementService.getEquipmentTypes().subscribe((res) => {
      this.equipmentType = res.data;
    });
  }
}
