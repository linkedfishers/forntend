import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import{ToastrService} from 'ngx-toastr';
import {Monitor,MonitorType} from 'src/app/interfaces/equipments.interface'
import {User} from 'src/app/interfaces/users.interface'
import {environment} from 'src/environments/environment'
import {EquipmentService} from 'src/app/services/equipment.service'
import Swal from 'sweetalert2/dist/sweetalert2'
import  {TranslateService} from '@ngx-translate/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {AuthService} from 'src/app/services/auth.service'


declare var initForm,$:any
declare var initSidebar,initPopups:any


@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.component.html',
  styleUrls: ['./monitor-list.component.scss']
})
export class MonitorListComponent implements OnInit {


  constructor(
    private authService :AuthService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private translate:TranslateService,
    private modalService :NgbModal,
    private equipementService :EquipmentService
) { }

readonly API:string =environment.apiUrl +'/';

currentUser:User;
monitors :Monitor[];
monitorTypes:MonitorType
formData:FormData;
newMonitor:Monitor;
imageSrc:any

userMonitor:Monitor[] = []
selectedMonitor = -1


  ngOnInit(): void {
    initForm();
    initSidebar();
    initPopups();
  this.currentUser=this.authService.getCurrentUser()

  this.route.params.subscribe(params=>{
  let typeId=params.typeId
  if(!typeId){
    this.router.navigate(['/equipments'])
  }
  this.initMonitors(typeId)
})
}
  initMonitors(typeId: string) {
    this.newMonitor = new Monitor();
    this.equipementService.getMonitorByTypeAndUser(typeId, this.currentUser._id).subscribe(
      res => {
        console.log(res);

        this.monitorTypes = res.data.type;
        this.monitors = res.data.monitors
      }
    )
  }
   fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(event.target.files);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', file, file.name);
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = e.target['result'];
      };
      reader.readAsDataURL(fileList[0]);
    }
  }


  createMonitor() {
    if (!this.newMonitor.name) {
      return;
    }
    this.formData = this.formData || new FormData();
    this.newMonitor.type = this.monitorTypes._id;
    for (const key in this.newMonitor) {
      if (this.newMonitor.hasOwnProperty(key)) {
        this.formData.append(key, this.newMonitor[key]);
      }
    }
    this.equipementService.createMonitor(this.formData).subscribe(
      res => {
        this.monitors.unshift(res.data);
        this.toastr.success(res.message);
        this.newMonitor = new Monitor();
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    )
  }
   openFileInput() {
    $("#postPhoto").click();
  }

   deleteMonitor(i) {
    Swal.fire({
      title: this.translate.instant('delete_Monitor') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_Monitor'),
      cancelButtonText: this.translate.instant('discard')
    }).then((result) => {
      if (result.value) {
        this.equipementService.deleteMonitor(this.monitors[i]._id).subscribe(
          res => {
            Swal.fire(
              {
                title: this.translate.instant('deleted_monitor'),
                icon: 'success'
              });
            this.monitors.splice(i, 1);
          },
          err => {
            Swal.fire({
              title: this.translate.instant('delete_error'),
              icon: 'error'
            });
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    })
  }
  onUpdateMonitor() {
    this.formData = this.formData || new FormData();
    for (const key in this.monitors[this.selectedMonitor]) {
      if (this.monitors[this.selectedMonitor].hasOwnProperty(key)) {
        this.formData.append(key, this.newMonitor[this.selectedMonitor][key]);
      }
    }
    this.equipementService.updateMonitor(this.formData, this.monitors[this.selectedMonitor]._id).subscribe(
      res => {
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.imageSrc = "";
        this.modalService.dismissAll();
      },
      err => {
        this.imageSrc = "";
        console.log(err);
        this.toastr.error(err.error.message);
      },
      () => {
      }
    )
  }
  openUpdatePopup(i) {
    initForm();
    this.imageSrc = "";
    this.selectedMonitor = i;
    $("#updateBtn").click();
  }

  openVerticallyCentered(content,i) {
    this.modalService.open(content, { centered: true });
    this.selectedMonitor = i;
  }
}

