import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit {
  constructor(private equipmentService: EquipmentService) {}
  readonly API: string = environment.apiUrl + '/';

  services: Service[];
  visibleservices: Service[];
  content: Service[] = [];
  ngOnInit(): void {
    initForm();
    initSidebar();
    initPopups();
    this.equipmentService.getServices().subscribe((res) => {
      console.log(res.data);
      this.services = res.data;
      this.visibleservices = this.services;
      console.log(this.visibleservices);
    });
  }
}
