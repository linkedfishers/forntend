import { Component, OnInit } from '@angular/core';
import{Monitor,MonitorType} from 'src/app/interfaces/equipments.interface'
import {User} from 'src/app/interfaces/users.interface';
import{ToastrService} from 'ngx-toastr';
import {environment} from 'src/environments/environment'

declare var initSidebar , initPopups :any;
declare var initForm,$:any


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor() { }

  currentUser:User
  readonly API:string=environment.apiUrl + '/';
  formData:FormData;
  imageSrc:'';
  newMonitor:Monitor;
  monitorTypes:MonitorType[];
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
  }

}
