import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;

@Component({
  selector: 'app-list-hebergements',
  templateUrl: './list-hebergements.component.html',
  styleUrls: ['./list-hebergements.component.scss'],
})
export class ListHebergementsComponent implements OnInit {
  constructor(private equipementService: EquipmentService) {}
  readonly API: string = environment.apiUrl + '/';

  hebergements: Hebergement[];
  visiblehebrgements: Hebergement[];
  content: Hebergement[] = [];
  ngOnInit(): void {
    initPopups();
    initSidebar();
    initForm();
    loadSvg();
    this.equipementService.getHebergements().subscribe((res) => {
      this.hebergements = res.data;
      this.visiblehebrgements = this.hebergements;
    });
  }
}
