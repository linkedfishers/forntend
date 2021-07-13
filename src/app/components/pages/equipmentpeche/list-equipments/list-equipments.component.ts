import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/interfaces/equipments.interface';
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
  visibleequipments: Equipment[];
  content: Equipment[] = [];
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.equipementService.getEquipments().subscribe((res) => {
      this.equipments = res.data;
      console.log(res.data);
      this.visibleequipments = this.equipments;
    });
  }
}
