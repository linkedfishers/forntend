import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ActivateAccountComponent } from './components/pages/activate-account/activate-account.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { BoatsComponent } from './components/pages/boats/boats.component';
import { DetailsBoatComponent } from './components/pages/details-boat/details-boat.component';
import { DetailsEquipmentComponent } from './components/pages/details-equipment/details-equipment.component';
import { DetailsHebergementsComponent } from './components/pages/details-hebergements/details-hebergements.component';
import { CategoriesComponent } from './components/pages/equipments/categories/categories.component';
import { CategoriesServiceComponent } from './components/pages/services/categoriesService/categories.component';
import { AboutusComponent } from './components/pages/aboutus/aboutus.component';
import { EquipmentListComponent } from './components/pages/equipments/equipment-list/equipment-list.component';
import { EquipmentsComponent } from './components/pages/equipments/equipments.component';
import { EventsComponent } from './components/pages/events/events.component';
import { HebergementsComponent } from './components/pages/hebergements/hebergements.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MapComponent } from './components/pages/map/map.component';
import { PasswordResetRequestComponent } from './components/pages/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { WindyComponent } from './components/pages/windy/windy.component';
import { AuthGuard } from './guards/auth.guard';
import { ServiceListComponent } from './components/pages/services/service-list/service-list.component';
import { MyReservationsComponent } from './components/pages/my-reservations/my-reservations.component';
import { ReservationsRequestComponent } from './components/pages/reservations-request/reservations-request.component';
import { ListReservationsComponent } from './components/pages/list-reservations/list-reservations.component';
import { DetailsEventsComponent } from './components/pages/details-events/details-events.component';
import { ProductListComponent } from './components/pages/products/product-list/product-list.component';
import { ProviderLoginComponent } from './components/pages/provider-login/provider-login.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';
import { DetailsProductComponent } from './components/pages/details-product/details-product.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { ListHebergementsComponent } from './components/pages/hebergements/list-hebergements/list-hebergements.component';
import { ListBoatsComponent } from './components/pages/boats/list-boats/list-boats.component';
import { ListServicesComponent } from './components/pages/services/list-services/list-services.component';
import { EquipmentpecheComponent } from './components/pages/equipmentpeche/equipmentpeche.component';
import { ListEquipmentsComponent } from './components/pages/equipmentpeche/list-equipments/list-equipments.component';
import { EquipmentsbycatComponent } from './components/pages/equipmentsbycat/equipmentsbycat.component';
import { ServicesbycatComponent } from './components/pages/servicesbycat/servicesbycat.component';
import { HebergementsbycatComponent } from './components/pages/hebergementsbycat/hebergementsbycat.component';
import { EquiplistcatComponent } from './components/pages/equiplistcat/equiplistcat.component';
import { NaComponent } from './components/common/na/na.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { OrderDetailsComponent } from './components/pages/order-details/order-details.component';
import { ChekoutPageComponent } from './components/pages/chekout-page/chekout-page.component';
import { DetailServices } from './interfaces/equipments.interface';
import { FirstscreenpageComponent } from './components/pages/firstscreenpage/firstscreenpage.component';
import { VisiteguiderComponent } from './components/pages/visiteguider/visiteguider.component';

const routes: Routes = [
  {
    path: '',
    component: FirstscreenpageComponent,
  },
  {
    path: 'visite-guider',
    component: VisiteguiderComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'main',
        component: HomeComponent,
      },
      {
        path: 'nav',
        component: NaComponent,
      },
      {
        path: 'acceuil',
        component: MainpageComponent,
      },

      {
        path: 'about-us',
        component: AboutusComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/order/:id',
        component: OrderDetailsComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        component: ChekoutPageComponent,
      },

      /*      {
        path: 'order/:id',
        component: OrderDetailsComponent,
      }, */

      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'weather',
        component: WindyComponent,
      },
      {
        path: 'boats',
        component: BoatsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'equipments',
        component: EquipmentpecheComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'homes',
        component: HebergementsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: CategoriesServiceComponent,
          },
          {
            path: ':typeId',
            component: ServiceListComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
      /*     {
        path: 'equipments',
        component: EquipmentsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: CategoriesComponent,
          },
          {
            path: ':typeId',
            component: EquipmentListComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      }, */
      {
        path: 'settings',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings/:page',
        component: AccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details-home/:id',
        component: DetailsHebergementsComponent,
      },
      {
        path: 'details-equipment/:id',
        component: DetailsEquipmentComponent,
      },
      {
        path: 'list-home',
        component: ListHebergementsComponent,
      },
      {
        path: 'list-boats',
        component: ListBoatsComponent,
      },
      {
        path: 'list-equipments',
        component: ListEquipmentsComponent,
      },
      {
        path: 'list-services',
        component: ListServicesComponent,
      },
      {
        path: 'details-boat/:id',
        component: DetailsBoatComponent,
      },
      {
        path: 'details-event/:id',
        component: DetailsEventsComponent,
      },
      {
        path: 'details-equipment/:id',
        component: DetailsEquipmentComponent,
      },
      {
        path: 'details-service/:id',
        component: DetailServices,
      },
      {
        path: 'my-booking-requests',
        component: MyReservationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'boats/type/:id',
        component: EquipmentsbycatComponent,
      },
      {
        path: 'freelancer/type/:id',
        component: ServicesbycatComponent,
      },
      {
        path: 'hebergements/type/:id',
        component: HebergementsbycatComponent,
      },
      {
        path: 'equipments/type/:id',
        component: EquiplistcatComponent,
      },
      {
        path: 'book/:type/:id',
        component: ReservationsRequestComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'booking-requests',
        component: ListReservationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marketplace/products-list',
        component: ProductListComponent,
      },
      {
        path: 'provider/add-product',
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marketplace/details-product/:id',
        component: DetailsProductComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'provider/login',
    component: ProviderLoginComponent,
  },

  {
    path: 'activate/:token',
    component: ActivateAccountComponent,
  },
  {
    path: 'password-reset-request',
    component: PasswordResetRequestComponent,
  },
  {
    path: 'reset-password/:token',
    component: PasswordResetComponent,
  },

  /*  {
    path: 'hello-linkedfishers',
    component: FirstscreenpageComponent,
  }, */
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
