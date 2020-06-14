import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make, Makes, Manufacturer, Manufacturers } from '../models/cars.model';

@Injectable({
  providedIn: 'root'
})

export class CarsService {

  constructor(private http: HttpClient) { }
  getHeaders() {
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('token')}`)
    }
  }
  getManufacturer (): Observable<Manufacturers> {
    return this.http.get<Manufacturers>('http://localhost:3000/getallmanufacturers', this.getHeaders());
  }

  getMakesByManufacturer (manufacturer: Manufacturer): Observable<Makes> {
    const url = `http://localhost:3000/GetMakeForManufacturer/${manufacturer.Mfr_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }

  getModelsForMakeId (make: Make) {
    const url = `http://localhost:3000/GetModelsForMakeId/${make.Make_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }
}
