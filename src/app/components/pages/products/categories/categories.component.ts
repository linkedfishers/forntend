import { Component, OnInit } from '@angular/core';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';

declare var initSidebar, initPopups: any;
declare var initForm, $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
  ) { }

  currentProvider: Provider;
  readonly API: string = environment.apiUrl + '/';
  categories: Categorie[];
  ngOnInit(): void {
    initSidebar();
    initPopups();
    initForm();
    this.productService.getProductCategories().subscribe(
      (res) => {
        this.categories = res.data;
      },
      (err) => {
        this.toastr.error('Error while loading products');
      }
    );
  }
}
