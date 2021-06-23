import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product, Categorie } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

declare var initSidebar, initPopups: any;
declare var initForm, $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}
  currentProvider: Provider;
  readonly API: string = environment.apiUrl + '/';
  searchKeyword: string;
  searchedProduct: Product[] = [];
  formData: FormData;
  imageSrc: any;
  newProduct: Product;
  categories: Categorie[];
  products: Product[];
  content: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      console.log(this.products);
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
  @Output() searchcriteria = new EventEmitter<String>();
  searchThis() {
    this.searchcriteria.emit(this.searchKeyword);
  }
 /*  searchThis(data) {
    this.content = this.products;
    console.log(data);
    if (data) {
      this.content = this.content.filter(function (ele, i, array) {
        let arrayelement = ele.name.toLowerCase();
        return arrayelement.includes(data);
      });
    } else {
      console.log(this.content);
    }
    console.log(this.content);
  } */
}

