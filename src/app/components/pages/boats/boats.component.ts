import { Component, OnInit } from '@angular/core';
import {
  Boat,
  BoatDetails,
  BoatType,
} from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as countriesLib from 'i18n-iso-countries';
import { TranslateService } from '@ngx-translate/core';

declare var initSidebar, initPopups: any, loadSvg: any;
declare var initForm, $: any;
declare const require;
@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss'],
})
export class BoatsComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  readonly API: string = environment.apiUrl + '/';

  countries = [];
  currentUser: User;
  formData: FormData;
  imageSrc: any;
  images: any[] = [];
  newBoat: Boat;
  userBoats: Boat[] = [];
  selectedBoat = -1;
  boatTypes: BoatType[] = [];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this._getCoutries();
    this.newBoat = new Boat();

    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.equipmentService.getBoatsByUser(this.currentUser._id).subscribe(
      (res) => {
        this.userBoats = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading boats');
      }
    );
    this.equipmentService.getBoatTypes().subscribe(
      (res) => {
        this.boatTypes = res.data;
        console.log(this.boatTypes);
      },
      (err) => {
        this.toastr.error('Error while loading boat types');
      }
    );
    this.equipmentService.getBoatTypes().subscribe((res) => {
      this.boatTypes = res.data;
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
    this.formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      const el = fileList[i];
      console.log(el);
      this.formData.append('files', el);
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

  createBoat() {
    if (!this.newBoat.name) {
      return;
    }
    this.formData = this.formData || new FormData();
    for (const key in this.newBoat) {
      if (this.newBoat.hasOwnProperty(key) && key != 'details') {
        this.formData.append(key, this.newBoat[key]);
      }
    }
    if (this.newBoat.position) {
      this.formData.append('lat', this.newBoat.position['lat']);
      this.formData.append('lng', this.newBoat.position['lng']);
    }
    this.formData.append('details', JSON.stringify(this.newBoat.details));
    this.equipmentService.createBoat(this.formData).subscribe(
      (res) => {
        this.userBoats.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newBoat = new Boat();
        console.log(this.newBoat);

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

  removeBoat(i: number) {
    Swal.fire({
      title: this.translate.instant('delete_boat') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_boat'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.equipmentService.deleteBoat(this.userBoats[i]._id).subscribe(
          (res) => {
            Swal.fire({
              title: this.translate.instant('deleted_boat'),
              icon: 'success',
            });
            this.userBoats.splice(i, 1);
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

  updateBoat() {
    this.formData = this.formData || new FormData();
    for (const key in this.userBoats[this.selectedBoat]) {
      if (this.userBoats[this.selectedBoat].hasOwnProperty(key)) {
        this.formData.append(key, this.userBoats[this.selectedBoat][key]);
      }
    }
    if (this.userBoats[this.selectedBoat].position) {
      this.formData.append(
        'lat',
        this.userBoats[this.selectedBoat].position['lat']
      );
      this.formData.append(
        'lng',
        this.userBoats[this.selectedBoat].position['lng']
      );
    }
    this.formData.append(
      'details',
      JSON.stringify(this.userBoats[this.selectedBoat].details)
    );
    this.equipmentService
      .updateBoat(this.formData, this.userBoats[this.selectedBoat]._id)
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.formData = new FormData();
          this.imageSrc = '';
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
    this.selectedBoat = i;
    $('#updateBtn').click();
  }
}
