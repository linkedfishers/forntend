import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { BoatType, EquipmentType, HebergementType, ServiceType } from 'src/app/interfaces/equipments.interface';
import { Provider } from 'src/app/interfaces/provider.interface';
import { User } from 'src/app/interfaces/users.interface';
import { PicturePipe } from 'src/app/pipes/picture.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
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
    private el: ElementRef,
    private equipmentService : EquipmentService,
    private toastr : ToastrService
  ) {}
  currentUser: User;
  isAdmin = false;
  isProvider = false;
  fullName: string = '';
  selected:string =""
  equipmentTypes:EquipmentType[]
   boatTypes : BoatType[]
   hebergementType:HebergementType[]
   serviceTypes : ServiceType[]
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
      this.equipmentService.getEquipmentTypes().subscribe(reslt=>{
    this.equipmentTypes=reslt.data
      },
      err=>{this.toastr.error('Error while loading homes');
    }
    )
    this.equipmentService.getBoatTypes().subscribe(reslt=>{
      this.boatTypes=reslt.data;


    },
    err=>{this.toastr.error("Error while Loading ");
  }
    )
    this.equipmentService.getHebergementTypes().subscribe(reslt=>{
        this.hebergementType=reslt.data

    },
    err=>{this.toastr.error("Error while Loading ");
  }
  )
  this.equipmentService.getServiceTypes().subscribe(res=>{
this.serviceTypes= res.data;

  },
  err=>{this.toastr.error("Error while Loading")})
  }
    update(e){
    this.selected = e.target.value
  }
}
