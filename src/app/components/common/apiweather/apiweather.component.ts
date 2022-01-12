import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { send } from 'process';
import { PostService } from 'src/app/services/post.service';
import { WeathrserviceService } from 'src/app/services/weathrservice.service';

@Component({
  selector: 'app-apiweather',
  templateUrl: './apiweather.component.html',
  styleUrls: ['./apiweather.component.scss'],
})
export class ApiweatherComponent implements OnInit {
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
      this.weatherForcastResponse = res;
      console.log(this.weatherForcastResponse);
    });
  }
  fetchData(formValues) {
    this.postService.getweatherData(formValues.location).subscribe((res) => {
      this.weatherResponse = res;
      console.log(this.weatherResponse);
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
