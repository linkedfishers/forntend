import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product, Categorie } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Provider } from 'src/app/interfaces/provider.interface';
import { environment } from 'src/environments/environment';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interfaces/cart-items.interface';
import { ToastrService } from 'ngx-toastr';

declare var initSidebar, initPopups: any;
declare var initForm, $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.form = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    cartService.initCartLocalStorage();
  }
  currentProvider: Provider;
  readonly API: string = environment.apiUrl + '/';
  searchKeyword: string;
  searchedProduct: Product[] = [];
  formData: FormData;
  productCart: Product;
  imageSrc: any;
  newProduct: Product;
  categories: Categorie[];
  products: Product[];
  form: FormGroup;
  productCat: Categorie[];
  visibleProducts: Product[];
  content: Product[] = [];
  cartItem: CartItem;

  minPrice: number = 0;
  maxPrice: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + ' Dt';
        case LabelType.High:
          return value + ' Dt';
        default:
          return value + ' Dt';
      }
    },
  };

  filterBy = 'price';
  orderBy = 1;
  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.visibleProducts = this.products;
    });
    this.productService.getProductCategories().subscribe((response) => {
      this.productCat = response.data;
      /*       console.log(this.productCat);
       */
    });
    initSidebar();
    initPopups();
    initForm();
  }

  onCbChange(e) {
    const isArray: FormArray = this.form.get('isArray') as FormArray;

    if (e.target.checked) {
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onSubmit() {
    console.log(this.form.value);
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
      return product.price <= this.maxPrice && product.price >= this.minPrice;
      
    });
  }

  applySortFilters() {
    this.visibleProducts = this.products.sort((p1, p2) => {
      switch (this.filterBy) {
        case 'price':
          return (p1.price - p2.price) * this.orderBy;
        case 'createdAt':
          return (
            (new Date(p1.createdAt).getTime() -
              new Date(p2.createdAt).getTime()) *
            this.orderBy
          );
        default:
          break;
      }
    });
  }

  addToCart(id) {
    const cart: CartItem = {
      productId: id,
      quantity: 1,
    };
    this.cartService.setCartItem(cart);
    this.toast.success('Your Product is Added To Cart');
  }
}
