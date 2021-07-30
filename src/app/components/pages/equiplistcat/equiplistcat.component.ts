import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment, EquipmentType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equiplistcat',
  templateUrl: './equiplistcat.component.html',
  styleUrls: ['./equiplistcat.component.scss']
})
export class EquiplistcatComponent implements OnInit {

  constructor(
private route :ActivatedRoute,
private equipmentService: EquipmentService

  ) { }

        equipments:Equipment[]
        type:EquipmentType
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      let id = params.id
      this.equipmentService.getEquipmentssByType(id).subscribe(res=>{
        this.equipments=res.data
        console.log(this.equipments)

      })
    })
  }

}
