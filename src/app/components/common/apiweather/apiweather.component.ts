import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { send } from 'process';
import { PostService } from 'src/app/services/post.service';
import { WeathrserviceService } from 'src/app/services/weathrservice.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-apiweather',
  templateUrl: './apiweather.component.html',
  styleUrls: ['./apiweather.component.scss'],
})
export class ApiweatherComponent implements OnInit {
  chart: any = [];
  chartMintemp: any = [];
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  public weathere: any;
  public weathrda: any = [];
  public weathers: any;

  public weatherSearch: FormGroup;
  public weatherResponse: any = [];
  public weatherForcastResponse: any = [];
  constructor(
    private apiService: WeathrserviceService,
    private postService: PostService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.weatherSearch = this.formbuilder.group({
      location: [''],
    });

    /*  this.apiService.getMarine().subscribe((res) => {
      this.weathers = res.;
      console.log(this.weathers);
    }); */
  }

  /*   sendToAPI(formValue) {
    this.apiService.getMarine(formValue.location).subscribe((res) => {
      this.weatherData = res;
      console.log(this.weatherData);
      console.log(this.weatherData.data.current_condition[0]);
    });
  } */

  weatherDataResponses = (formvalues) => {
    setTimeout(() => {
      this.fetchData(formvalues);
    }, 2000);
    setTimeout(() => {
      this.fetchDataForcast(formvalues);
    }, 3000);
  };

  fetchDataForcast(formValues) {
    this.postService.getForcastweather(formValues.location).subscribe((res) => {
      this.weatherForcastResponse = res.data;
      let temp_max = this.weatherForcastResponse['list'].map(
        (res) => res.main.temp_max
      );
      let temp_min = this.weatherForcastResponse['list'].map(
        (res) => res.main.temp_min
      );
      let allDates = this.weatherForcastResponse['list'].map((res) => res.dt);
      let weatherDates = [];

      allDates.forEach((element) => {
        let jsDate = new Date(element * 1000);
        weatherDates.push(jsDate.toLocaleTimeString('en'));
      });

      this.chartMintemp = new Chart('canvasTempMin', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_min,
              borderColor: '#104777',
              fill: true,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
              },
            ],
            yAxes: [
              {
                display: true,
              },
            ],
          },
        },
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#FE1C05',
              fill: false,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
              },
            ],
            yAxes: [
              {
                display: true,
              },
            ],
          },
        },
      });
    });
  }
  
  fetchData(formValues) {
    this.postService.getweatherData(formValues.location).subscribe((res) => {
      this.weatherResponse = res;
    });
  }

  /*  sendto() {
    this.apiService.getWeathe().subscribe((res) => {
      this.weathrda = res;
      console.log(this.weathrda);
    });
  } */

  /*   weather(formvalue1, formvalue2) {
    this.apiService
      .getfetch(formvalue1.ln, formvalue2.lng)
      .subscribe((respon) => {
        this.weathere = respon;
        console.log(this.weathere);
       });
  }*/
}
