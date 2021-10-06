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
    this.weatherDat = {
      main: {},
      isDay: true,
    };
    this.getWeatherDat();
    this.width = $('#weather-container').width();
  }

  getWeatherDat() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=tunis&appid=ca73b9253fb0753ca439d964a688acba'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
    /*   let data = JSON.parse(
      '{"coord":{"lon":9,"lat":34},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":313.04,"feels_like":312.08,"temp_min":313.04,"temp_max":313.04,"pressure":1014,"humidity":19,"sea_level":1014,"grnd_level":1012},"visibility":10000,"wind":{"speed":7.82,"deg":93,"gust":7.33},"clouds":{"all":1},"dt":1625755652,"sys":{"type":1,"id":1197,"country":"TN","sunrise":1625717976,"sunset":1625769489},"timezone":3600,"id":2464461,"name":"Tunisia","cod":200}'
    );
    this.setWeatherData(data); */
  }
  setWeatherData(data) {
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
  }
}
