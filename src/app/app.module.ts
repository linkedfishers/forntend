import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { ChatWidgetComponent } from './components/common/chat-widget/chat-widget.component';
import { NavigationWidgetComponent } from './components/common/navigation-widget/navigation-widget.component';
import { AccountComponent } from './components/pages/account/account.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EventsComponent } from './components/pages/events/events.component';
import { MapComponent } from './components/pages/map/map.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { WeatherComponent } from './components/common/weather/weather.component';
import { TimelineComponent } from './components/pages/profile/timeline/timeline.component';
import { AboutComponent } from './components/pages/profile/about/about.component';
import { PhotosComponent } from './components/pages/profile/photos/photos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProfileInfoComponent } from './components/pages/account/profile-info/profile-info.component';
import { ProfileSocialComponent } from './components/pages/account/profile-social/profile-social.component';
import { ChangePasswordComponent } from './components/pages/account/change-password/change-password.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ImageCropperModule } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';
import { PostComponent } from './components/common/post/post.component';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { OwlTooltipModule } from 'owl-ng';
import { WindyComponent } from './components/pages/windy/windy.component';
import { PropretiesPipe } from './pipes/propreties.pipe';
import { BoatsComponent } from './components/pages/boats/boats.component';
import { HebergementsComponent } from './components/pages/hebergements/hebergements.component';
import { EquipmentsComponent } from './components/pages/equipments/equipments.component';
import { EquipmentListComponent } from './components/pages/equipments/equipment-list/equipment-list.component';
import { CategoriesComponent } from './components/pages/equipments/categories/categories.component';
import { SearchComponent } from './components/pages/search/search.component';
import { HebergementListComponent } from './components/common/hebergement-list/hebergement-list.component';
import { BoatsListComponent } from './components/common/boats-list/boats-list.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { MapBoxComponent } from './components/common/map-box/map-box.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ActivateAccountComponent } from './components/pages/activate-account/activate-account.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/pages/password-reset-request/password-reset-request.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { AdminComponent } from './components/pages/admin/admin.component';
import { CommentComponent } from './components/common/comment/comment.component';
import { DetailsHebergementsComponent } from './components/pages/details-hebergements/details-hebergements.component';
import { DetailsBoatComponent } from './components/pages/details-boat/details-boat.component';
import { DetailsEquipmentComponent } from './components/pages/details-equipment/details-equipment.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './components/pages/carousel/carousel.component';
import { SocialLoginModule, GoogleLoginProvider } from 'angularx-social-login';
import { PicturePipe } from './pipes/picture.pipe';
import { DatePipe } from '@angular/common';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServiceListComponent } from './components/pages/services/service-list/service-list.component';
import { CategoriesServiceComponent } from './components/pages/services/categoriesService/categories.component';
import { MyReservationsComponent } from './components/pages/my-reservations/my-reservations.component';
import { ReservationsRequestComponent } from './components/pages/reservations-request/reservations-request.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationsComponent } from './components/pages/list-reservations/list-reservations.component';
import { DetailsEventsComponent } from './components/pages/details-events/details-events.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DetailsProductComponent } from './components/pages/details-product/details-product.component';
import { ProductListComponent } from './components/pages/products/product-list/product-list.component';
import { ProviderLoginComponent } from './components/pages/provider-login/provider-login.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';
import { FilterPipe } from './pipes/filter.pipe';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { AboutusComponent } from './components/pages/aboutus/aboutus.component';
import { ListHebergementsComponent } from './components/pages/hebergements/list-hebergements/list-hebergements.component';
import { ListBoatsComponent } from './components/pages/boats/list-boats/list-boats.component';
import { ListServicesComponent } from './components/pages/services/list-services/list-services.component';
import { CommonModule } from '@angular/common';
import { DetailsServiceComponent } from './components/pages/details-service/details-service.component';
import { EquipmentpecheComponent } from './components/pages/equipmentpeche/equipmentpeche.component';
import { ListEquipmentsComponent } from './components/pages/equipmentpeche/list-equipments/list-equipments.component';
import { EquipmentsbycatComponent } from './components/pages/equipmentsbycat/equipmentsbycat.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    CategoriesServiceComponent,
    AppComponent,
    FilterPipe,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent,
    ChatWidgetComponent,
    NavigationWidgetComponent,
    AccountComponent,
    LayoutComponent,
    EventsComponent,
    MapComponent,
    ProfileComponent,
    WeatherComponent,
    TimelineComponent,
    AboutComponent,
    PhotosComponent,
    ProfileInfoComponent,
    ProfileSocialComponent,
    ChangePasswordComponent,
    PostComponent,
    TimeAgoPipe,
    WindyComponent,
    PropretiesPipe,
    BoatsComponent,
    HebergementsComponent,
    EquipmentsComponent,
    EquipmentListComponent,
    CategoriesComponent,
    SearchComponent,
    HebergementListComponent,
    BoatsListComponent,
    NotificationsComponent,
    MapBoxComponent,
    ActivateAccountComponent,
    PasswordResetComponent,
    PasswordResetRequestComponent,
    AdminComponent,
    CommentComponent,
    DetailsHebergementsComponent,
    DetailsBoatComponent,
    DetailsEquipmentComponent,
    CarouselComponent,
    PicturePipe,
    ServicesComponent,
    ServiceListComponent,
    MyReservationsComponent,
    ReservationsRequestComponent,
    ListReservationsComponent,
    DetailsEventsComponent,
    ProductsComponent,
    DetailsProductComponent,
    ProductListComponent,
    ProviderLoginComponent,
    AddProductComponent,
    MainpageComponent,
    FooterComponent,
    ContactComponent,
    AboutusComponent,
    ListHebergementsComponent,
    ListBoatsComponent,
    ListServicesComponent,
    DetailsServiceComponent,
    EquipmentpecheComponent,
    ListEquipmentsComponent,
    EquipmentsbycatComponent,
  ],
  imports: [
    BrowserModule,

    CommonModule,
    CarouselModule,
    IvyCarouselModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          let access_token = localStorage.getItem('acessToken');
          return access_token;
        },
        allowedDomains: [environment.apiDomain],
        disallowedRoutes: ['http://localhost:3000/auth/signin'],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    NgbModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlTooltipModule,
    ImageCropperModule,
    NgxLinkifyjsModule.forRoot(),
    NgxSliderModule,
    NgImageFullscreenViewModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '108417378352-9o4n67jsc1rd3mqcmgoobr7b6ns2ep55.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      },
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
