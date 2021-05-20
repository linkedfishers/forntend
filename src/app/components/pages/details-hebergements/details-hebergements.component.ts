import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
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
  selector: 'app-details-hebergements',
  templateUrl: './details-hebergements.component.html',
  styleUrls: ['./details-hebergements.component.scss']
})
export class DetailsHebergementsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private equipmentService: EquipmentService,
  ) { }
  readonly API: string = environment.apiUrl + '/';

  hebergement: Hebergement;
  currentUser: User
  ngOnInit(): void {


    this.currentUser = this.authService.getCurrentUser();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.equipmentService.getHebergement(id).subscribe((response) => {
        this.hebergement = response.data;
        console.log(this.hebergement);
      })
    });
    initContent();

  }

}
