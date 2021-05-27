
import { Component, OnInit } from '@angular/core';
import { Boat, Equipment, EquipmentType, Hebergement, Service, ServiceType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

declare var initSidebar, initPopups: any;
declare var initForm, $: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }
  currentUser:User
  readonly API:string =environment.apiUrl + '/'
 formData: FormData;
  imageSrc: any;
  newService: Service;
  serviceTypes: ServiceType[];
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();

}}
