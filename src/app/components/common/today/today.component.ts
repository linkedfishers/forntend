import { Component, OnInit } from '@angular/core';
import { ForcastserviceService } from 'src/app/services/forcastservice.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  timeline = [];
  weatherNow: any;
  currentTime = new Date();
  location: any;
  constructor(private forcastService: ForcastserviceService) {}

  ngOnInit(): void {
    this.forcastService.getWeatherForcast().subscribe((data) => {
      this.getTodayForcast(data);
    });
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);
    return { start, to };
  }

  getTodayForcast(today: any) {
    this.location = today.city;
    for (const forcast of today.list.slice(0,8)) {
      this.timeline.push({
        time: forcast.dt_txt,
        temp: forcast.main.temp,
      });
      const apiDate = new Date(forcast.dt_txt).getTime();

      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        this.weatherNow = forcast;
        console.log(this.weatherNow);
      }
    }
  }
}
