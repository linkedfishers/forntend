import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product, Categorie } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';
import { Options, LabelType } from "@angular-slider/ngx-slider";

declare var initSidebar, initPopups: any;
declare var initForm, $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) { }
  currentProvider: Provider;
  readonly API: string = environment.apiUrl + '/';
  searchKeyword: string;
  searchedProduct: Product[] = [];
  formData: FormData;
  imageSrc: any;
  newProduct: Product;
  categories: Categorie[];
  products: Product[];
  visibleProducts: Product[];
  content: Product[] = [];

  minPrice: number = 0;
  maxPrice: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " Dt";
        case LabelType.High:
          return value + " Dt";
        default:
          return value + " Dt";
      }
    }
  };

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.visibleProducts = this.products;
    });
    initSidebar();
    initPopups();
    initForm();
  }
  searchProduct() {
    if (!this.searchKeyword) return;
    this.productService.searchProduct(this.searchKeyword).subscribe((res) => {
      console.log(res);
      this.searchedProduct = res.data;
    });
  }

  updatePriceFilter() {
    this.visibleProducts = this.products.filter((product) => {
      return (product.price <= this.maxPrice && product.price >= this.minPrice);
    });
  }

}

