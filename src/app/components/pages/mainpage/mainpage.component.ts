import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import ProductService from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private adminservice: AdminService,
    private translate: TranslateService
  ) {}
  readonly API: string = environment.apiUrl + '/';

  categories: Categorie[];
  contenttext: Content;
  products: Product[];
  visibleProducts: Product[];
  content: Product[] = [];
  carousselPictures = [
    'assets/img/cover/1.png',
    'assets/img/cover/2.png',
    'assets/img/cover/3.png',
    'assets/img/cover/4.png',
    'assets/img/cover/5.png',
  ];
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.visibleProducts = this.products;
    });
  }
}
