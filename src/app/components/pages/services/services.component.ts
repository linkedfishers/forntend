import { Component, OnInit } from '@angular/core';
import {  Service, ServiceType } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as countriesLib from 'i18n-iso-countries';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
declare var initSidebar, initPopups: any, loadSvg: any;
declare var initForm, $: any;
declare const require;


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor( private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
  ) {}

  readonly API: string = environment.apiUrl + '/';
  serviceCredentials = { name: '',description:'' ,price:'' ,type:'',images:'',country:''};
  public serviceForm: FormGroup;
  countries = [];
  currentUser: User;
  formData: FormData;
  images: any='';
  imageSrc: any;

  service:Service;
  newService: Service;
  userServices: Service[] = [];
  selectedService = -1;
  serviceTypes: ServiceType[] = [];

  ngOnInit(): void {

    this.serviceForm = this.formBuilder.group({
          name: ['', Validators.required],
         description: ['', Validators.required],
          price : ['', Validators.required],
          type : ['', Validators.required],
          images : [''],
          country : [''],
    });
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this._getCoutries();
    this.newService = new Service();
    this.newService.price =0;


    this.equipmentService.getServicesByUser(this.currentUser._id).subscribe(
      (res) => {
        this.userServices = res.data;
        console.log("user service",this.userServices);
      },
      (err) => {
        this.toastr.error('Error while loading services');
      }
    );
    this.equipmentService.getServiceTypes().subscribe(
      (res) => {
        this.serviceTypes = res.data;
        console.log("service type",res.data);
      },
      (err) => {
        this.toastr.error('Error while loading service types');
      }
    );
    this.equipmentService.getServiceTypes().subscribe((res) => {
      this.serviceTypes = res.data;
      console.log("service",res.data);
    });
  }

  /*   fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', file, file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target['result'];
      };
      reader.readAsDataURL(fileList[0]);
    }
  } */
  fileChange(event) {
    this.imageSrc = '';
    let fileList: FileList = event.target.files;
    console.log("filelist",fileList);
    this.formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      console.log("el",fileList[i]);
      const el = fileList[i];
      this.images=el;
      this.formData.append('files', this.images);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target['result'];
    };
    reader.readAsDataURL(fileList[0]);
  }

  /*   onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  } */

  /* fileChange(event) {
    this.imageSrc = '';
    let fileList: FileList = event.target.files;
    this.formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      const el = fileList[i];
      console.log(el);
      this.formData.append('file', file, file.name);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target['result'];
    };
    reader.readAsDataURL(fileList[0]);
  } */

  createService() {
    if (!this.newService.name) {
      return;
    }
    this.formData = this.formData || new FormData();
    for (const key in this.newService) {
      if (this.newService.hasOwnProperty(key) && key != 'details') {
        this.formData.append(key, this.newService[key]);
      }
    }
    if (this.newService.position) {
      this.formData.append('lat', this.newService.position['lat']);
      this.formData.append('lng', this.newService.position['lng']);
    }
    this.formData.append('details', JSON.stringify(this.newService.details));
    console.log('details', JSON.stringify(this.newService.details))
    this.equipmentService.createService(this.formData).subscribe(
      (res) => {
        this.userServices.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newService = new Service();
        console.log(this.newService);

        this.imageSrc = '';
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  openFileInput() {
    $('#postPhoto').click();
  }

  private _getCoutries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
    console.log(this.countries);
  }

  removeService(i: number) {
    Swal.fire({
      title: this.translate.instant('delete_service') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_service'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.equipmentService.deleteService(this.userServices[i]._id).subscribe(
          (res) => {
            Swal.fire({
              title: this.translate.instant('deleted_service'),
              icon: 'success',
            });
            this.userServices.splice(i, 1);
          },
          (err) => {
            Swal.fire({
              title: this.translate.instant('delete_error'),
              icon: 'error',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  async updateService() {
    this.formData = this.formData || new FormData();

    if (this.userServices[this.selectedService].position) {
      this.formData.append('lat',this.userServices[this.selectedService].position['lat'] );
      this.formData.append('lng',this.userServices[this.selectedService].position['lng']);
    }

    this.formData.append('name', this.userServices[this.selectedService].name);
    this.formData.append('price',JSON.stringify(this.userServices[this.selectedService].price) );
    this.formData.append('description', this.userServices[this.selectedService].description);
    this.formData.append('type', this.userServices[this.selectedService].type);
    this.formData.append('country', this.userServices[this.selectedService].country);

    this.equipmentService.updateService(this.formData, this.userServices[this.selectedService]._id).subscribe(
        (res) => {
          console.log('res',res);
          console.log("update service",this.userServices);
          this.toastr.success(res.message);
          this.formData = new FormData();

          this.equipmentService.getServicesByUser(this.currentUser._id).subscribe(
            (res) => {
              this.userServices = res.data;
              console.log("user service",this.userServices);
            },
            (err) => {
              this.toastr.error('Error while loading boats');
            }
          );
        },
        (err) => {
          this.imageSrc = '';
          console.log(err);
          this.toastr.error(err.error.message);
        },
        () => {}
      );
  }

  openUpdatePopup(i) {
    initForm();
    this.imageSrc = '';
    this.selectedService = i;
    $('#updateBtn').click();
  }
}
