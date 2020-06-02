import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export interface Manufacturers {
  Count: number;
  Message: string;
  SearchCriteria?: string;
  Results: Manufacturer[];
}
export interface Manufacturer {
  Country: string;
  Mfr_CommonName: string;
  Mfr_ID: number;
  Mfr_Name: string;
  VehicleTypes: any[]
}

export interface Makes {
  Count: number;
  Message: string;
  SearchCriteria?: string;
  Results: Make[];
}

export interface Make {
  Make_ID: number;
  Make_Name: string;
  Mfr_Name: string;
}

export interface Models {
  Count: number;
  Message: string;
  SearchCriteria?: string;
  Results: Model[];
}

export interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
Model_Name: string;
}


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
    const url = `http://localhost:3000/GetMakeForManufacturer?manufacturerId=${manufacturer.Mfr_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }

  getModelsForMakeId (make: Make) {
    const url = `http://localhost:3000/GetModelsForMakeId?makeId=${make.Make_ID}`;
    return this.http.get<Makes>(url, this.getHeaders());
  }
}
