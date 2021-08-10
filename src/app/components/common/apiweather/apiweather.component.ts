import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { send } from 'process';
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
  constructor(
    private apiService: WeathrserviceService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formbuilder.group({
      location: [''],
    });
    /*  this.apiService.getMarine().subscribe((res) => {
      this.weathers = res.;
      console.log(this.weathers);
    }); */
  }

  sendToAPI(formValues) {
    this.apiService.getMarine(formValues.location).subscribe((res) => {
      this.weatherData = res;
      console.log(this.weatherData);
      console.log(this.weatherData.data.current_condition[0]);
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
