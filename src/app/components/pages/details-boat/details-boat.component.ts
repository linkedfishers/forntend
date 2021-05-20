import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/interfaces/equipments.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
declare var app, loadSvg, initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader, loadSvg: any;

@Component({
  selector: 'app-details-boat',
  templateUrl: './details-boat.component.html',
  styleUrls: ['./details-boat.component.scss']
})
export class DetailsBoatComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
  ) { }
  readonly API: string = environment.apiUrl + '/';

  boat: Boat;
  currentUser: User
  ngOnInit(): void {


    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.equipmentService.getBoat(id).subscribe((response) => {
        this.boat = response.data;
      })
    });
    initContent();

  }
}
