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


}
