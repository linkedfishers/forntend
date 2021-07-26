import { Component, Input, OnInit } from '@angular/core';
import {
  EquipmentType,
  HebergementType,
  BoatType,
  ServiceType,
} from 'src/app/interfaces/equipments.interface';
import { Report, User } from 'src/app/interfaces/users.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as data from '../../../interfaces/countries.json';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Provider } from 'src/app/interfaces/provider.interface';
import { Categorie } from 'src/app/interfaces/product.interface';
import { Content } from 'src/app/interfaces/content.interface';
import ProductService from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var initForm, $: any;
declare var initSidebar, initPopups, loadSvg: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private productService: ProductService,
    private modalService: NgbModal
  ) { }
  readonly API: string = environment.apiUrl + '/';
  countries = (<any>data).default;
  usersList: User[] = [];
  providersList: Provider[] = [];
  equipmentTypes: EquipmentType[];
  boatTypes: BoatType[];
  hebergementTypes: HebergementType[];
  serviceTypes: ServiceType[];
  newEquipmentType: EquipmentType;
  formData: FormData;
  imageSrc: any;
  skip = 0;
  count = 5;
  selectedCategory = 'equipment';
  selectedBoat = -1;
  activeUsersCount = 0;
  newUsers = 0;
  showReportsPannel = false;
  selectedUser: User;
  language: string;
  reports: Report[] = [];
  categories: Categorie[];
  contents: Content[];
  newContent: Content;
  newBoatType: BoatType;
  userBoat: BoatType[] = [];
  ngOnInit(): void {
    this.newEquipmentType = new EquipmentType();
    this.newContent = new Content();
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.loadUsers();
    this.adminService.getOverview().subscribe(
      (response) => {
        this.activeUsersCount = response.data.activeUsers;
        this.newUsers = response.data.newUsers;
      },
      (error) => {
        console.log(error);
      }
    );

    this.adminService.getAllProviders().subscribe((response) => {
      this.providersList = response.data;
    });
    this.productService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.equipmentService.getEquipmentTypes().subscribe(
      (res) => {
        this.equipmentTypes = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading equipment types');
      }
    );
    this.equipmentService.getBoatTypes().subscribe(
      (res) => {
        this.boatTypes = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading boat types');
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
    this.equipmentService.getServiceTypes().subscribe(
      (res) => {
        this.serviceTypes = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading services types');
      }
    );
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
  }

  getCountryName(countryCode: string) {
    if (!this.countries) return '';
    let country = this.countries.find(
      (country) => country.code === countryCode
    );
    if (!country) return '';
    return country.name;
  }

  fileChange(event) {
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
  }
  //Post home Page
  createContent() {
    if (!this.newContent.content) {
      return;
    }
    this.formData = this.formData || new FormData();

    for (const key in this.newContent) {
      if (this.newContent.hasOwnProperty(key)) {
        this.formData.append(key, this.newContent[key]);
      }
    }
    this.adminService.createContent(this.formData).subscribe(
      (res) => {
        this.contents.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newContent = new Content();
        this.imageSrc = '';
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  addCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  createEquipmentType() {
    if (!this.newEquipmentType.name) {
      return;
    }
    this.formData = this.formData || new FormData();
    this.formData.append('name', this.newEquipmentType['name']);
    this.formData.append('description', this.newEquipmentType['description']);
    this.adminService
      .createCategoryType(this.formData, this.selectedCategory)
      .subscribe(
        (res) => {
          if (this.selectedCategory == 'equipment') {
            this.equipmentTypes.unshift(res.data);
          } else if (this.selectedCategory == 'boat') {
            this.boatTypes.unshift(res.data);
          } else if (this.selectedCategory == 'hebergement') {
            this.hebergementTypes.unshift(res.data);
          } else if (this.selectedCategory == 'service') {
            this.serviceTypes.unshift(res.data);
          } else if (this.selectedCategory == 'productCategory') {
            this.categories.unshift(res.data);
          }
          this.toastr.success(res.message);
          this.formData = new FormData();
          this.newEquipmentType = new EquipmentType();
          this.imageSrc = '';
        },
        (err) => {
          this.imageSrc = '';
          console.log(err);
          this.toastr.error(err.error.message);
        },
        () => { }
      );
  }

  openFileInput() {
    $('#postPhoto').click();
  }

  loadUsers() {
    this.adminService.getUsers(this.count, this.skip).subscribe(
      (response) => {
        this.usersList = this.usersList.concat(response.data);
        this.skip += this.count;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showReports(user: User) {
    if (this.selectedUser == user) {
      this.showReportsPannel = false;
      this.selectedUser = null;
      return;
    }
    this.selectedUser = user;
    this.adminService.getReports(user._id).subscribe(
      (response) => {
        this.reports = response.data;
        this.showReportsPannel = true;
      },
      (error) => {
        this.toastr.error('Error while fetching reports');
      }
    );
  }

  // deleteReport(report: Report) {
  //   Swal.fire({
  //     title: this.translate.instant('delete_report') + ' ' + report.content + '?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: this.translate.instant('delete_report'),
  //     cancelButtonText: this.translate.instant('discard')
  //   }).then((result) => {
  //     if (result.value) {
  //       this.adminService.deleteReport(report._id).subscribe(
  //         res => {
  //           Swal.fire(
  //             {
  //               title: this.translate.instant('delete_report'),
  //               icon: 'success'
  //             });
  //         },
  //         err => {
  //           Swal.fire({
  //             title: this.translate.instant('delete_post_error'),
  //             icon: 'error'
  //           });
  //         }
  //       )
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       return;
  //     }
  //   });
  // }

  updateBoatType() {
    this.formData = this.formData || new FormData();
    for (const key in this.userBoat[this.selectedBoat]) {
      if (this.userBoat[this.selectedBoat].hasOwnProperty(key)) {
        this.formData.append(key, this.userBoat[this.selectedBoat][key]);
      }
    }

    this.adminService
      .updateBoatType(this.formData, this.userBoat[this.selectedBoat]._id)
      .subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.formData = new FormData();
          this.newBoatType = new BoatType();
          this.imageSrc = '';
        },
        (err) => {
          this.imageSrc = '';
          console.log(err);
          this.toastr.error(err.error.message);
        },
        () => { }
      );
  }

  updateCategory(type: EquipmentType, categoryName: string) {
    if (!type['updating']) {
      type['updating'] = true;
    } else {
      type['updating'] = false;
      this.formData = new FormData();
      this.formData.append('name', type['name']);
      this.formData.append('description', type['description']);
      this.adminService
        .updateBoatType(this.formData, type._id)
        .subscribe(
          (res) => {
            console.log(res);
            this.toastr.success(res.message);
            this.formData = new FormData();
            this.imageSrc = '';
          },
          (err) => {
            this.imageSrc = '';
            console.log(err);
            this.toastr.error(err.error.message);
          },
          () => { }
        );
    }
  }

  deleteCategory(type: EquipmentType, categoryName: string) {
    Swal.fire({
      title: this.translate.instant('delete_category') + ' ' + type.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_category'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteCategoryType(type._id, categoryName).subscribe(
          (res) => {
            Swal.fire({
              title: this.translate.instant('delete_category'),
              icon: 'success',
            });

            if (categoryName == 'equipment') {
              let i = this.equipmentTypes.findIndex((t) => t._id == type._id);
              this.equipmentTypes.splice(i, 1);
            } else if (categoryName == 'boat') {
              let i = this.boatTypes.findIndex((t) => t._id == type._id);
              this.boatTypes.splice(i, 1);
            } else if (categoryName == 'hebergement') {
              let i = this.hebergementTypes.findIndex((t) => t._id == type._id);
              this.hebergementTypes.splice(i, 1);
            } else if (categoryName == 'service') {
              let i = this.serviceTypes.findIndex((t) => t._id == type._id);
              this.serviceTypes.splice(i, 1);
            } else if (categoryName == 'productCategory') {
              let i = this.categories.findIndex((t) => t._id == type._id);
              this.categories.splice(i, 1);
            }
          },
          (err) => {
            Swal.fire({
              title: this.translate.instant('delete_post_error'),
              icon: 'error',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  toggleUserStatus(i: number) {
    this.adminService
      .updateUserStatus(this.usersList[i]._id, !this.usersList[i].activated)
      .subscribe(
        (response) => {
          console.log(response);
          this.usersList[i].activated = response.data.activated;
          this.toastr.success('updated status');
        },
        (error) => {
          this.toastr.error('error');
          console.log(error);
        }
      );
  }
  openUpdatePopup(i) {
    initForm();
    this.imageSrc = '';
    this.selectedBoat = i;
    $('#updateBtn').click();
  }
  toggleProviderStatus(i: number) {
    this.adminService
      .updateUserStatus(
        this.providersList[i]._id,
        !this.providersList[i].activated
      )
      .subscribe(
        (response) => {
          this.providersList[i].activated = response.data.activated;
          this.toastr.success('updated status');
        },
        (error) => {
          this.toastr.error('error');
          console.log(error);
        }
      );
  }
}
