import { Component, OnInit } from '@angular/core';
import { Product, Categorie } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';

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

  formData: FormData;
  imageSrc: any;
  newProduct: Product;
  categories: Categorie[];
  products: Product[];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response.data;
        console.log(this.products);
      }
    )
    initSidebar();
    initPopups();
    initForm();
  }
}
