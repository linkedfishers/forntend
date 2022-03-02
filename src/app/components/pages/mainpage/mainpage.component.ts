import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Content } from 'src/app/interfaces/content.interface';
import {
  Boat,
  Equipment,
  Hebergement,
  Service,
} from 'src/app/interfaces/equipments.interface';
import { Categorie, Product } from 'src/app/interfaces/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ProductService } from 'src/app/services/product.service';
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
    private translate: TranslateService,
    private equipmentService: EquipmentService
  ) {
    	this.responsiveOptions = [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1,
        },
      ];
  }
  readonly API: string = environment.apiUrl + '/';
  myStyle: object = {};
  myParams: object = {};
  responsiveOptions;

  width: number = 100;
  height: number = 100;
  boats: Boat[];
  contents: Content[];
  cont: Content;
  equipments: Equipment[];
  hebergements: Hebergement[];
  services: Service[];
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

  photos: any;
  photoss: any = [];
  ngOnInit(): void {
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      'z-index': -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#ff0000',
        },
        shape: {
          type: 'triangle',
        },
      },
    };
    this.productService
      ./* getProducts */ getSomeProducts()
      .subscribe((response) => {
        this.products = response.data;
        this.visibleProducts = this.products;
      });
    this.equipmentService.getContent().subscribe((res) => {
      this.contents = res.data;
      this.contents.map((item) => {
        this.cont = item;
        this.photos = item.images;
        this.photos.map((item) => {
          item = this.API + item;
          this.photoss.push(item);
          return this.photoss;
        });
      });
    });
    this.equipmentService.getEuipmentWithLimit().subscribe((response) => {
      this.equipments = response.data;
    });
    this.equipmentService.getBoats().subscribe((reponse) => {
      this.boats = reponse.data;
    });
    this.equipmentService.getHebergements().subscribe((reponse) => {
      this.hebergements = reponse.data;
      console.log();
    });
    this.equipmentService.getServices().subscribe((reponse) => {
      this.services = reponse.data;
    });
  }
}
