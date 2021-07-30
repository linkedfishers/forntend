import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Boat, BoatType, Equipment, Hebergement, Service } from 'src/app/interfaces/equipments.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-equipmentsbycat',
  templateUrl: './equipmentsbycat.component.html',
  styleUrls: ['./equipmentsbycat.component.scss']
})
export class EquipmentsbycatComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private equipmentService: EquipmentService,
    private translate: TranslateService,
    private toastr: ToastrService,) { }

  readonly API: string = environment.apiUrl + '/';
  boats: Boat[]
  type: BoatType
    equipements:Equipment []
    hebergements : Hebergement[]
    services:Service[]

  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.route.params.subscribe(params => {
      let id = params.id;
      this.equipmentService.getBoatsByType(id).subscribe(res=>{
        this.boats=res.data
        console.log(this.boats)
      })
    });
  }
}
