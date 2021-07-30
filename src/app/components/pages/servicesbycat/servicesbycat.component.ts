import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service, ServiceType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-servicesbycat',
  templateUrl: './servicesbycat.component.html',
  styleUrls: ['./servicesbycat.component.scss']
})
export class ServicesbycatComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private equipmentService :EquipmentService

  ) { }
      services : Service[]
      type:ServiceType
  ngOnInit(): void {
     initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.route.params.subscribe(params=>{
      let id = params.id
      this.equipmentService.getServicessByType(id).subscribe(res=>{
        this.services = res.data
        console.log(this.services)
      })
    })
  }

}
