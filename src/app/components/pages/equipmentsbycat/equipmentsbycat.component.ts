import { Component, OnInit } from '@angular/core';
import { Hebergement } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipmentsbycat',
  templateUrl: './equipmentsbycat.component.html',
  styleUrls: ['./equipmentsbycat.component.scss']
})
export class EquipmentsbycatComponent implements OnInit {
    home:Hebergement[]
  
  constructor(
    private equipementService:EquipmentService
  ) { }

  ngOnInit(): void {
  }

}
