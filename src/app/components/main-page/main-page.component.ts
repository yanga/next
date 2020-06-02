import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CarsService, Manufacturer, Make, Model } from 'src/app/services/cars-service.service';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: 'app-main-page.html',
  styleUrls: ['app-main-page.scss']
})
export class MainPageComponent implements OnInit {
  public manufacturerOptions = [];
  public makesOptions = [];
  public modelOptions = [];
  
  public manufacturerError = '';
  public makeError = '';
  public modelError = '';

  public values = {
    manufacturer:  '',
    make: '',
    model: '',
  };

  public formSubmited = false;

  constructor (
    private carsService: CarsService,
    private auth: AuthService,
    private fb: FormBuilder,
    ) {}

  ngOnInit() {
    this.getManufacturerList();
  }


  private getManufacturerList() {
    this.carsService.getManufacturer().subscribe(res => {
      this.manufacturerOptions = res.Results;
    }, err => {
      if(err.status === 401) {
        this.auth.logout();
      } else {
        // TBD: handle other errors
      }
    });
  }

  manufacturerDisplayFn(manufacturer: Manufacturer): string {
    return manufacturer && manufacturer.Mfr_Name ? manufacturer.Mfr_Name : '';
  }
  makeDisplayFn(make: Make): string {
    return make && make.Make_Name ? make.Make_Name : '';
  }
  modelDisplayFn(model: Model): string {
    return model && model.Model_Name ? model.Model_Name : '';
  }

  public onManufacturerChange(value) {
    this.modelOptions = [];
    this.makesOptions = [];
    const manufacturer: Manufacturer = value.source.value;
    this.manufacturerError = '';
    this.values = {
      manufacturer: manufacturer.Mfr_Name,
      make: '',
      model: '',
    }
    this.carsService.getMakesByManufacturer(manufacturer).subscribe(res => {
      this.makesOptions = res.Results;
    }, err => {
      if(err.status === 401) {
        this.auth.logout();
      } else {
        // TBD: handle other errors
      }
    });
  }

  public onMakeChange (value) {
    this.modelOptions = [];
    const make: Make = value.source.value;
    this.makeError = '';
    this.values = {
      manufacturer: this.values.manufacturer,
      make: make.Make_Name,
      model: '',
    }
    this.carsService.getModelsForMakeId(make).subscribe(res => {
      this.modelOptions = res.Results;
    }, err => {
      if(err.status === 401) {
        this.auth.logout();
      } else {
        // TBD: handle other errors
      }
    });
  }
  public onModelChange(value) {
    const model: Model = value.source.value;
    this.values = Object.assign({...this.values},{model: model.Model_Name});
    this.modelError = '';
  }

  public submitForm () {
    let formIsValid = true;
    Object.keys(this.values).map(key => {
      if(this.values[key] === ''){
        this[`${key}Error`] = 'Required';
        formIsValid = false;
      }
    });
    if(formIsValid) {
      this.formSubmited = true;
    }
  }
}
