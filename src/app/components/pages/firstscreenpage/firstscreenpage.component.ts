import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-firstscreenpage',
  templateUrl: './firstscreenpage.component.html',
  styleUrls: ['./firstscreenpage.component.scss'],
})
export class FirstscreenpageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  playVideo = () => {
    const vid = document.getElementById('vid');
  };

  navigateToRoute = () => {
    this.router.navigate(['/main']);
  };

  navigateToTogin = () => {
    this.router.navigate(['/login']);
  };
}
