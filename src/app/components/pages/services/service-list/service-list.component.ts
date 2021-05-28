import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service, ServiceType } from 'src/app/interfaces/equipments.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var initForm, $: any;
declare var initSidebar, initPopups: any;

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentService,
    private translate: TranslateService,
    private modalService: NgbModal
  ) { }
  readonly API: string = environment.apiUrl + '/';
  currentUser: User
  services: Service[];
  serviceType: ServiceType;
  formData: FormData;
  imageSrc: any;
  newService: Service;


  userServices: Service[] = [];
  selectedService = -1;
  ngOnInit(): void {
    initForm();
    initSidebar();
    initPopups();
    this.currentUser = this.authService.getCurrentUser();

    this.route.params.subscribe(params => {
      let typeId = params.typeId;
      if (!typeId) {
        this.router.navigate(['/services']);
      }
      this.initServices(typeId);
    })
  }
  initServices(typeId: string) {
    this.newService = new Service();
    this.equipmentService.getServicesByTypeAndUser(typeId, this.currentUser._id).subscribe(
      res => {
        console.log(res);

        this.serviceType = res.data.type;
        this.services = res.data.services
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
  createService() {
    if (!this.newService.name) {
      return;
    }
    this.formData = this.formData || new FormData();
    this.newService.type = this.serviceType._id;
    for (const key in this.newService) {
      if (this.newService.hasOwnProperty(key)) {
        this.formData.append(key, this.newService[key]);
      }
    }
    this.equipmentService.createService(this.formData).subscribe(
      res => {
        this.services.unshift(res.data);
        this.toastr.success(res.message);
        this.newService = new Service();
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
  deleteService(i) {
    Swal.fire({
      title: this.translate.instant('delete_service') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_service'),
      cancelButtonText: this.translate.instant('discard')
    }).then((result) => {
      if (result.value) {
        this.equipmentService.deleteService(this.services[i]._id).subscribe(
          res => {
            Swal.fire(
              {
                title: this.translate.instant('deleted_service'),
                icon: 'success'
              });
            this.services.splice(i, 1);
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
  onUpdateService() {
    this.formData = this.formData || new FormData();
    for (const key in this.services[this.selectedService]) {
      if (this.services[this.selectedService].hasOwnProperty(key)) {
        this.formData.append(key, this.services[this.selectedService][key]);
      }
    }
    this.equipmentService.updateService(this.formData, this.services[this.selectedService]._id).subscribe(
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
    this.selectedService = i;
    $("#updateBtn").click();
  }

  openVerticallyCentered(content, i) {
    this.modalService.open(content, { centered: true });
    this.selectedService = i;
  }
}
