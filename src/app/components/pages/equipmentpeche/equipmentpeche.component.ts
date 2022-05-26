import { Component, OnInit } from '@angular/core';
import {
  Equipment,
  EquipmentType,
} from 'src/app/interfaces/equipments.interface';
import * as countriesLib from 'i18n-iso-countries';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

declare var initSidebar, initPopups, loadSvg: any;
declare var initForm, $: any;
declare const require ;

@Component({
  selector: 'app-equipmentpeche',
  templateUrl: './equipmentpeche.component.html',
  styleUrls: ['./equipmentpeche.component.scss'],
})
export class EquipmentpecheComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  readonly API: string = environment.apiUrl + '/';
  currentUser: User;
  countries = [];
  formData: FormData;
  imgSrc: any;
  newEquipement: Equipment;
  userEquipment: Equipment[] = [];
  equipmentTypes: EquipmentType[] = [];
  selectedEquipment = -1;
  ngOnInit(): void {
      initSidebar();
      this._getCoutries();
      initPopups();
      initForm();
      loadSvg();
    this.currentUser = this.authService.getCurrentUser();
    this.newEquipement = new Equipment();
    this.newEquipement.price = 0;

    this.equipmentService.getEquipmentsByUser(this.currentUser._id).subscribe(
      (res) => {
        this.userEquipment = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading Equipment types');
      }
    );
    this.equipmentService.getEquipmentTypes().subscribe(
      (res) => {
        this.equipmentTypes = res.data;
      },
      (err) => {
        this.toastr.error('Erreur while loading Equipement Types');
      }
    );
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
/*   fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData = new FormData();
      this.formData.append('file', file, file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target['result'];
      };
      reader.readAsDataURL(fileList[0]);
    }
  } */
  fileChange(event) {
    this.imgSrc = '';
    let fileList: FileList = event.target.files;
    this.formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      const el = fileList[i];
      console.log(el);
      this.formData.append('files', el);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target['result'];
    };
    reader.readAsDataURL(fileList[0]);
  }
  createEquipment() {
    if (!this.newEquipement.name) {
      return;
    }
/*     console.log(this.newEquipement.type);
 */    this.formData = this.formData || new FormData();
    for (const key in this.newEquipement) {
      if (this.newEquipement.hasOwnProperty(key) && key != 'details') {
        this.formData.append(key, this.newEquipement[key]);
      }
    }
    if (this.newEquipement.position) {
      this.formData.append('lat', this.newEquipement.position['lat']);
      this.formData.append('lng', this.newEquipement.position['lng']);
    }
    this.formData.append('details', JSON.stringify(this.newEquipement.details));
    this.equipmentService.createEquipment(this.formData).subscribe(
      (res) => {
        this.userEquipment.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newEquipement = new Equipment();
        console.log(this.newEquipement);
        this.imgSrc = '';
      },
      (err) => {
       
        console.log(err);
        this.toastr.error(err.error.message);
      },
  
    );
  }

  openFileInput() {
    $('#postPhoto').click();
  }
  deleteEquipement(i) {
    Swal.fire({
      title: this.translate.instant('delete_equipement') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_equipement'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.equipmentService
          .deleteEquipment(this.userEquipment[i]._id)
          .subscribe(
            (res) => {
              Swal.fire({
                title: this.translate.instant('deleted_equipment'),
                icon: 'success',
              });
              this.userEquipment.splice(i, 1);
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
  updateEquipment() {
    this.formData = this.formData || new FormData();
    for (const key in this.userEquipment[this.selectedEquipment]) {
      if (this.userEquipment[this.selectedEquipment].hasOwnProperty(key)) {
        this.formData.append(
          key,
          this.userEquipment[this.selectedEquipment][key]
        );
      }
    }
    if (this.userEquipment[this.selectedEquipment].position) {
      this.formData.append(
        'lat',
        this.userEquipment[this.selectedEquipment].position['lat']
      );
      this.formData.append(
        'lng',
        this.userEquipment[this.selectedEquipment].position['lng']
      );
    }
    this.equipmentService
      .updateEquipment(
        this.formData,
        this.userEquipment[this.selectedEquipment]._id
      )
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.formData = new FormData();
          this.newEquipement = new Equipment();
          this.imgSrc = '';
        },
        (err) => {
          this.imgSrc = '';
          console.log(err);
          this.toastr.error(err.error.message);
        },
       
      );
  }
  openUpdatePopup(i) {
    this.imgSrc = '';
    this.selectedEquipment = i;
    $('#updateBtn').click();
  }
}
