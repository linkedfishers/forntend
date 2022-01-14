import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  width = 280;
  weatherDat: any;
  constructor() {}
  ngOnInit(): void {

    this.width = $('#weather-container').width();
  }

  /*

  */
  /*  getWeatherDat() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=tunis&appid=ca73b9253fb0753ca439d964a688acba'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });

  } */
  /*  setWeatherData(data) {
    this.weatherDat = data;
    let sunsetTime = new Date(this.weatherDat.sys.sunset * 1000);
    this.weatherDat.sunser_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherDat.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.weatherDat.temp_celcius = (this.weatherDat.main.temp - 273.15).toFixed(
      0
    );
    this.weatherDat.temp_min = (this.weatherDat.main.temp_min - 273.15).toFixed(
      0
    );
    this.weatherDat.temp_max = (this.weatherDat.main.temp_max - 273.15).toFixed(
      0
    );
    this.weatherDat.temp_feels_like = (
      this.weatherDat.main.feels_like - 273.15
    ).toFixed(0);
  } */
}
