import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import ProductService from 'src/app/services/product.service';
declare var initContent: any;
declare var initSidebar, initPopups, initForm, $: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,

  ) { }

  categories: Categorie[] = [];
  newProduct: Product;
  imageSrc: any;
  formData: FormData;

  ngOnInit(): void {
    this.newProduct = new Product();
    initContent();
    initSidebar();
    initPopups();
    initForm();
    this.productService.getCategories().subscribe(
      response => {
        this.categories = response.data;
      }
    )
  }

  addProduct() {
    this.formData = this.formData || new FormData();
    for (const key in this.newProduct) {
      if (this.newProduct.hasOwnProperty(key)) {
        this.formData.append(key, this.newProduct[key]);
      }
    }
    this.productService.createProduct(this.formData).subscribe(
      res => {
        // this.userBoats.unshift(res.data);
        this.toastr.success(res.message);
        this.formData = new FormData();
        this.newProduct = new Product();
        this.imageSrc = "";
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    )
  }

  fileChange(event) {
    this.imageSrc = "";
    let fileList: FileList = event.target.files;
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

  openFileInput() {
    $("#postPhoto").click();
  }

}
