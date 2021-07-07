import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

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
    this.equipmentService.getHebergements().subscribe((res) => {
      this.services = res.data;
      this.visibleservices = this.services;
    });
  }
}
