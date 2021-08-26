import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import ProductService from 'src/app/services/product.service';
import Swal from 'sweetalert2';
declare var initContent: any;
declare var initSidebar, initPopups, initForm, $: any, loadSvg: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  categories: Categorie[] = [];
  newProduct: Product;
  imageSrc: any;
  formData: FormData;
  currentUser: User;
  providerProducts: Product[] = [];
  selectedProduct = -1;

  ngOnInit(): void {
    this.newProduct = new Product();
    initContent();
    initSidebar();
    initPopups();
    initForm();
    loadSvg();
    this.productService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
    this.currentUser = this.authService.getCurrentUser();
    this.productService.getProductByProvider(this.currentUser._id).subscribe(
      (res) => {
        this.providerProducts = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading Products ');
      }
    );
  }

  addProduct() {
    this.formData = this.formData || new FormData();
    for (const key in this.newProduct) {
      if (this.newProduct.hasOwnProperty(key)) {
        this.formData.append(key, this.newProduct[key]);
      }
    }
    this.productService.createProduct(this.formData).subscribe(
      (res) => {
        // this.userBoats.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newProduct = new Product();
        this.imageSrc = '';
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }
  fileChange(event) {
    
    this.imageSrc = '';
    let fileList: FileList = event.target.files;
    this.formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      const el = fileList[i];
      console.log(el);
      this.formData.append('file', el);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target['result'];
    };
    reader.readAsDataURL(fileList[0]);
  }

  /*
  fileChange(event) {
    this.imageSrc = '';
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
 */
  openFileInput() {
    $('#postPhoto').click();
  }

  removeProduct(i: number) {
    Swal.fire({
      title: this.translate.instant('deleted_product') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_product'),
      cancelButtonText: this.translate.instant('discard'),
    }).then((result) => {
      if (result.value) {
        this.productService
          .deleteProduct(this.providerProducts[i]._id)
          .subscribe(
            (res) => {
              Swal.fire({
                title: this.translate.instant('deleted_product'),
                icon: 'success',
              });
              this.providerProducts.splice(i, 1);
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
  updateProduct() {
    this.formData = this.formData || new FormData();
    for (const key in this.providerProducts[this.selectedProduct]) {
      if (this.providerProducts[this.selectedProduct].hasOwnProperty(key)) {
        this.formData.append(
          key,
          this.providerProducts[this.selectedProduct][key]
        );
      }
    }
    this.productService
      .updateProduct(
        this.formData,
        this.providerProducts[this.selectedProduct]._id
      )
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
    this.selectedProduct = i;
    $('#updateBtn').click();
  }
}
