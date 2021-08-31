import { Component, OnInit } from '@angular/core';
import {
  Equipment,
  EquipmentType,
} from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

declare var app,
  loadSvg,
  initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader,
  loadSvg: any;

@Component({
  selector: 'app-details-equipment',
  templateUrl: './details-equipment.component.html',
  styleUrls: ['./details-equipment.component.scss'],
})
export class DetailsEquipmentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService
  ) {}
  readonly API: string = environment.apiUrl + '/';

  equipment: Equipment;
  currentUser: User;
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.equipmentService.getEquipment(id).subscribe((response) => {
        this.equipment = response.data;
        console.log(this.equipment);
      });
    });
    initContent();
  }
}
