import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hebergement, HebergementType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-hebergementsbycat',
  templateUrl: './hebergementsbycat.component.html',
  styleUrls: ['./hebergementsbycat.component.scss']
})
export class HebergementsbycatComponent implements OnInit {

  constructor(
    private equipmentServices: EquipmentService,
    private route : ActivatedRoute
  ) { }
    hebergements : Hebergement[]
    type:HebergementType
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.route.params.subscribe(params=>{
      let id = params.id
      this.equipmentServices.getHebergementsByType(id).subscribe(res=>{
            this.hebergements = res.data
            console.log(this.hebergements)
      })
    })
  }

}
