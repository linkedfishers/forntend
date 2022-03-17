import { Component, Input, OnInit } from '@angular/core';
import { SplashAnimationType } from './spash-animation';
@Component({
  selector: 'app-spalshscreen',
  templateUrl: './spalshscreen.component.html',
  styleUrls: ['./spalshscreen.component.scss'],
})
export class SpalshscreenComponent implements OnInit {
  windowWidth: string;
  spalashTransition: string;
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 1;
  @Input() duration: number = 4;
  @Input() animationType: SplashAnimationType = SplashAnimationType.FadeOut;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      let transitionStyle = '';
      switch (this.animationType) {
        case SplashAnimationType.SlideLeft:
          this.windowWidth = '-' + window.innerWidth + 'px';
          transitionStyle = 'left' + this.animationDuration + 's';
          break;
        case SplashAnimationType.SlideRight:
          this.windowWidth = '-' + window.innerWidth + 'px';
          transitionStyle = 'left' + this.animationDuration + 's';
          break;
        case SplashAnimationType.FadeOut:
          this.windowWidth = '-' + window.innerWidth + 'px';
          transitionStyle = 'opacity' + this.animationDuration + 's';
          this.opacityChange = 0;
      }
      this.spalashTransition = transitionStyle;
      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }
}
