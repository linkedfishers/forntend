import { Component, OnInit } from '@angular/core';
import {
  Boat,
  Hebergement,
  HebergementType,
  Equipment,
} from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import * as countriesLib from 'i18n-iso-countries';

declare var initSidebar, initPopups, loadSvg: any;
declare var initForm, $: any;
declare var initAnimation, $: any;
declare const require;

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.scss'],
})
export class HebergementsComponent implements OnInit {
  constructor(
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  readonly API: string = environment.apiUrl + '/';
  countries = [];
  currentUser: User;
  formData: FormData;
  imageSrc: any;
  home: Hebergement ;
  newHome: Hebergement;
  userHomes: Hebergement[] = [];
  hebergementTypes: HebergementType[] = [];
  selectedHome = -1;

  ngOnInit(): void {
    /*     initAnimation();
     */ initSidebar();
    initPopups();
    initForm();
    loadSvg();

    this.currentUser = this.authService.getCurrentUser();
    this._getCoutries();
    this.newHome = new Hebergement();
    this.newHome.price = 0;

    this.equipmentService.getHebergementsByUser(this.currentUser._id).subscribe(
      (res) => {
        this.userHomes = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading homes');
      }
    );
    this.equipmentService.getHebergementTypes().subscribe(
      (res) => {
        this.hebergementTypes = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading hebergement types');
      }
    );
  }

  /* fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(event.target.files);
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

  createHebergement() {
    if (!this.newHome.name) {
      return;
    }
    console.log(this.newHome.type);
    this.formData = this.formData || new FormData();
    for (const key in this.newHome) {
      if (this.newHome.hasOwnProperty(key) && key != 'details') {
        this.formData.append(key, this.newHome[key]);
      }
    }
    if (this.newHome.position) {
      this.formData.append('lat', this.newHome.position['lat']);
      this.formData.append('lng', this.newHome.position['lng']);
    }
    this.formData.append('details', JSON.stringify(this.newHome.details));
    this.equipmentService.createHebergement(this.formData).subscribe(
      (res) => {
        this.userHomes.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newHome = new Hebergement();
        console.log(this.newHome);

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

  openFileInput() {
    $('#postPhoto').click();
  }

  deleteHebergement(i) {
    Swal.fire({
      title: this.translate.instant('delete_home') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_home'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.equipmentService
          .deleteHebergement(this.userHomes[i]._id)
          .subscribe(
            (res) => {
              Swal.fire({
                title: this.translate.instant('deleted_home'),
                icon: 'success',
              });
              this.userHomes.splice(i, 1);
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

  updateHebergement() {
    this.formData = this.formData || new FormData();
    for (const key in this.userHomes[this.selectedHome]) {
      if (this.userHomes[this.selectedHome].hasOwnProperty(key)) {
        this.formData.append(key, this.userHomes[this.selectedHome][key]);
      }
    }
    if (this.userHomes[this.selectedHome].position) {
      this.formData.append(
        'lat',
        this.userHomes[this.selectedHome].position['lat']
      );
      this.formData.append(
        'lng',
        this.userHomes[this.selectedHome].position['lng']
      );
    }
    this.equipmentService
      .updateHebergement(this.formData, this.userHomes[this.selectedHome]._id)
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.formData = new FormData();
          this.newHome = new Hebergement();
          this.imageSrc = '';
        },
        (err) => {
          this.imageSrc = '';
          this.toastr.error(err.error.message);
        },
        () => {}
      );
  }

  openUpdatePopup(i) {
    this.imageSrc = '';
    this.selectedHome = i;
    $('#updateBtn').click();
  }
}
