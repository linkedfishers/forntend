import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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
    private equipmentService :EquipmentService,
    private translate : TranslateService

  ) { }
      services : Service[]
      type:ServiceType
      language:string
  ngOnInit(): void {
     initSidebar();
    initPopups();
    initForm();
    loadSvg();
        this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
    this.route.params.subscribe(params=>{
      let id = params.id
      this.equipmentService.getServicessByType(id).subscribe(res=>{
        this.services= res.data;
        console.log(this.services)
      })
    })
  }

}
