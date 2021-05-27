import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EquipmentType, MonitorType } from 'src/app/interfaces/equipments.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
declare var initSidebar, initPopups: any;
declare var initForm, $: any;
@Component({
  selector: 'app-categories-monit',
  templateUrl: './categories-monit.component.html',
  styleUrls: ['./categories-monit.component.scss']
})
export class CategoriesMonitComponent implements OnInit {

  constructor(
      private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }
   currentUser: User
  readonly API: string = environment.apiUrl + '/';

    monitorTypes: MonitorType[];

  ngOnInit(): void {
     this.currentUser = this.authService.getCurrentUser();

    initSidebar();
    initPopups();
    initForm();
    this.equipmentService.getMonitorTypes().subscribe(
      res => {
        this.monitorTypes = res.data;
      },
      err => {
        this.toastr.error('Error while loading homes');
      }
    )
  }

}
