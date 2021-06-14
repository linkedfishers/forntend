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


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'weather',
        component: WindyComponent
      },
      {
        path: 'boats',
        component: BoatsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'homes',
        component: HebergementsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: CategoriesServiceComponent
          },
          {
            path: ':typeId',
            component: ServiceListComponent
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      },
      {
        path: 'equipments',
        component: EquipmentsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: CategoriesComponent
          },
          {
            path: ':typeId',
            component: EquipmentListComponent
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      },
      {
        path: 'settings',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings/:page',
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'details-home/:id',
        component: DetailsHebergementsComponent,
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
        path: 'my-booking-requests',
        component: MyReservationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'book/:type/:id',
        component: ReservationsRequestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'booking-requests',
        component: ListReservationsComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
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
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
