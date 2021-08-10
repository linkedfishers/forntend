import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EquipmentType } from 'src/app/interfaces/equipments.interface';
import { Notification } from 'src/app/interfaces/posts.interface';
import { Provider } from 'src/app/interfaces/provider.interface';
import { User } from 'src/app/interfaces/users.interface';
import { PicturePipe } from 'src/app/pipes/picture.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

declare var initHeader, initHexagons: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private equipmentService: EquipmentService,
    private el: ElementRef
  ) {}
  readonly API: string = environment.apiUrl + '/';

  currentUser: User;
  firstname: string;

  notifications: Notification[];
  isAdmin = false;
  isProvider = false;

  language: string;

  searchKeyword: string;

  searchedUsers: User[] = [];

  isGuest = true;
  fullName: string = '';
  equipmentTypes: EquipmentType[];
  ngOnInit(): void {
    initHeader();
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
      console.log(this.language);
    });
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.isGuest = false;
      initHeader();
      initHexagons();
      if (this.currentUser.role == 'provider') {
        this.firstname = (this.currentUser as Provider).companyName;
      } else {
        this.firstname =
          this.currentUser.firstName || this.currentUser.fullName.split(' ')[0];
      }
      this.userService.getNotifications().subscribe(
        (res) => {
          this.notifications = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    const picturePipe = new PicturePipe();
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      if (this.currentUser.role == 'provider') {
        const currentProvider = this.currentUser as Provider;
        this.fullName = currentProvider.companyName;
        this.isProvider = true;
      } else {
        this.fullName = this.currentUser.fullName;
      }
      /*   let profilePicture1, profilePicture2;
      profilePicture1 = this.el.nativeElement.querySelector('#profilePicture1');
      profilePicture2 = this.el.nativeElement.querySelector('#profilePicture2');
      profilePicture1.setAttribute(
        'data-src',
        picturePipe.transform(this.currentUser.profilePicture)
      );
      profilePicture2.setAttribute(
        'data-src',
        picturePipe.transform(this.currentUser.profilePicture)
      ); */
    } else {
      this.fullName = 'Guest';
    }
    initHexagons();
    this.isAdmin = this.authService.isAdmin();
  }

  setLanguage(language: string) {
    this.currentUser.language = language;
    this.authService.updateUser(this.currentUser).subscribe((res) => {
      console.log(res);
      localStorage.setItem('language', language);
      this.translate.use(language);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToNotification(i) {
    let url = '';
    switch (this.notifications[i].type) {
      case 'reservation_request':
        url = '';
        break;
      case 'followed_you':
        url = '/profile/' + this.notifications[i].sender.slug;
        break;
      default:
        url = '/post/' + this.notifications[i].targetId;
        break;
    }
    this.router.navigateByUrl(url);
  }

  search() {
    if (!this.searchKeyword) return;
    this.userService.search(this.searchKeyword).subscribe((res) => {
      console.log(res);

      this.searchedUsers = res.data;
    });
  }
}
