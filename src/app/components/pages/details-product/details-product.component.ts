import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import ProductService from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { PicturePipe } from 'src/app/pipes/picture.pipe';

declare var app,
  loadSvg,
  initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader,
  loadSvg: any;
@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,
    private auService: AuthService,
    private translate: TranslateService
  ) { }

  readonly API: string = environment.apiUrl + '/';
  product: Product;
  currentUser: User;
  isOwner = false;
  ngOnInit(): void {
    const picturePipe = new PicturePipe();
    this.currentUser = this.auService.getCurrentUser();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.productService.getProduct(id).subscribe((response) => {
        this.product = response.data.product;
        if (this.product.pictures.length == 0) {
          this.product.pictures = [this.product.picture];
        }
        this.product.pictures = this.product.pictures.map(
          picture => {
            return picturePipe.transform(picture);
          }
        )
        this.isOwner = response.data.isOwner || false;
      });
    });
    initContent();
  }
}
