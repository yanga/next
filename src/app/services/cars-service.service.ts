import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Make, Makes, Manufacturer, Manufacturers } from '../models/cars.model';
import { ConfigParams } from '../models/config.model';

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
    const url = `${ConfigParams.API.baseURL}getallmanufacturers`;
    return this.http.get<Manufacturers>(url , this.getHeaders());
  }

  getMakesByManufacturer (manufacturer: Manufacturer): Observable<Makes> {
    const url = `${ConfigParams.API.baseURL}GetMakeForManufacturer/${manufacturer.Mfr_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }

  getModelsForMakeId (make: Make) {
    const url = `${ConfigParams.API.baseURL}GetModelsForMakeId/${make.Make_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }
}
