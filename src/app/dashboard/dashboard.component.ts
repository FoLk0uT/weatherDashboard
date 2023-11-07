import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  city: string = '';
  weatherData: any;
  tempInCelsius: any;
  error: string = '';
  foundError: boolean = false;
  sunIcon = faSun;
  moonIcon = faMoon;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if(this.city === ''){ return }
    this.weatherService.getWeather(this.city).subscribe((data) => {
      this.foundError = false;
      this.setWeatherData(data);
    },
    (error) => {
      this.foundError = true;
      error = this.error;
    });
  }

  setWeatherData (data: any) {
    this.weatherData = data;
    this.tempInCelsius = Math.round(this.weatherData.main.temp - 273.15);
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
  }
}
