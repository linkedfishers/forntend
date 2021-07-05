import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Provider } from 'src/app/interfaces/provider.interface';
import { User } from 'src/app/interfaces/users.interface';
import { PicturePipe } from 'src/app/pipes/picture.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
declare var initHexagons;
@Component({
  selector: 'app-navigation-widget',
  templateUrl: './navigation-widget.component.html',
  styleUrls: ['./navigation-widget.component.scss'],
})
export class NavigationWidgetComponent implements OnInit {
  readonly API: string = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private el: ElementRef
  ) {}
  currentUser: User;
  isAdmin = false;
  isProvider = false;
  fullName: string = '';
  ngOnInit(): void {
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
      /*      let profilePicture1, profilePicture2;
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
}
