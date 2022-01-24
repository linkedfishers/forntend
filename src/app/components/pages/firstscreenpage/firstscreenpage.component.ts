import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-firstscreenpage',
  templateUrl: './firstscreenpage.component.html',
  styleUrls: ['./firstscreenpage.component.scss'],
})
export class FirstscreenpageComponent implements OnInit {
  isShow = false;
  ishidden = true;

  isShow2 = false;
  isHidden2 = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  playVideo = () => {
    const vid = document.getElementById('vid');
  };

  navigateToRoute = () => {
    this.isShow = !this.isShow;
    this.ishidden = !this.ishidden;
  };

  navigateToTogin = () => {
    this.isShow = !this.isShow;
    this.isHidden2 = !this.isHidden2;
  };

  navigateTohomePage = () => {
    this.router.navigate(['/acceuil']);
  };
  navigateToLoginePage = () => {
    this.router.navigate(['/login']);
  };

  accederAuSite = () => {
    this.router.navigate(['/acceuil']);
  };

  /* ********** */

  boatList = () => {
    this.router.navigate(['/list-boats']);
  };

  homeList = () => {
    this.router.navigate(['/list-home']);
  };

  listService = () => {
    this.router.navigate(['/list-services']);
  };

  toEshopEquip = () => {
    this.router.navigate(['/marketplace/products-list']);
  };

  toEvent = () => {
    this.router.navigate(['/events']);
  };

  becomeAprovider = () => {
    this.router.navigate(['/provider/login']);
  };
  backtoHome = () => this.router.navigate(['/']);
  myboat = () => this.router.navigate(['/boats']);
  myhome = () => this.router.navigate(['/homes']);
  myservice = () => this.router.navigate(['/services']);
}
