import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

declare var initSidebar, initPopups: any;
declare var initForm, $: any;

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
    this.equipementService.getHebergements().subscribe((res) => {
      this.hebergements = res.data;
         this.visiblehebrgements = this.hebergements;
    });
  }
}
