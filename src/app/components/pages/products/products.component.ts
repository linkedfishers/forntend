import { Component, OnInit } from '@angular/core';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';
declare var initSidebar, initPopups: any;
declare var initForm, $: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  currentProvider: Provider;
  readonly API: string = environment.apiUrl + '/';
  formData: FormData;
  imageSrc: any;
  newProduct: Product;
  productCategorie: Categorie[];

  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
  }
}
