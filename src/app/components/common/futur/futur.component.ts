import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { ForcastserviceService } from 'src/app/services/forcastservice.service';

@Component({
  selector: 'app-futur',
  templateUrl: './futur.component.html',
  styleUrls: ['./futur.component.scss'],
})
export class FuturComponent implements OnInit {
  weatherData: any = [];
  forcastDeatils: any;
  primaryDisplay = true;
  secondDisplay = false;
  selectedIndex: number;
  constructor(private forcastService: ForcastserviceService) {}

  ngOnInit(): void {
    this.forcastService
      .getWeatherForcast()
      .pipe(pluck('list'))
      .subscribe((data) => {
        this.futureForcast(data);
      });
  }
  futureForcast(data: any) {
    for (let i = 0; i < data.length; i = i + 8) {
      this.weatherData.push(data[i]);
    }
    console.log(this.weatherData);
  }
  toggle(data: any, index: number) {
    this.primaryDisplay = !this.primaryDisplay;
    this.secondDisplay = !this.secondDisplay;

    this.forcastDeatils = data;
    this.selectedIndex = index;
  }
  showDetails(data: any, i: number) {
    this.forcastDeatils = data;
    this.selectedIndex = i;
  }
}
