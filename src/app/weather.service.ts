import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    const apiKey = 'bf726250dbb2f76a65d121647c1b79a2';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return this.http.get(apiUrl).pipe(
      catchError((error) => {
        if (error.status === 404) {
          // Handle the 404 error here
          console.error('City not found:', error);
        }
        return throwError('Error fetching weather data');
      })
    );
  }
}
