import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Make, Manufacturer, Model } from '../../../models/cars.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cars-model-selector',
  templateUrl: 'cars-model-selector.html',
  styleUrls: ['cars-model-selector.scss']
})
export class CarsModelSelector implements OnInit {
  public manufacturerOptions = [];
  public makesOptions = [];
  public modelOptions = [];
  
  public manufacturerError = '';
  public makeError = '';
  public modelError = '';
  public generalError: string;
  public values = {
    manufacturer:  '',
    make: '',
    model: '',
  };

  public formSubmitted = false;

  constructor (
    private carsService: CarsService,
    private auth: AuthService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.getManufacturerList();
  }


  private getManufacturerList() {
    this.carsService.getManufacturer().subscribe(res => {
      this.manufacturerOptions = res.Results;
    }, err => {
      this.handleError(err);
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
    this.generalError = '';

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
      this.handleError(err);
    });
  }

  public onMakeChange (value) {
    this.modelOptions = [];
    const make: Make = value.source.value;
    this.makeError = '';
    this.generalError = '';
    this.values = {
      manufacturer: this.values.manufacturer,
      make: make.Make_Name,
      model: '',
    }
    this.carsService.getModelsForMakeId(make).subscribe(res => {
      this.modelOptions = res.Results;
    }, err => {
      this.handleError(err);
    });
  }

  public onModelChange(value) {
    this.generalError = '';
    const model: Model = value.source.value;
    this.values = Object.assign({...this.values},{model: model.Model_Name});
    this.modelError = '';
  }

  private  handleError (err) {
    console.log('ERR', err.status)
    if(err.status === 401) {
      this.router.navigateByUrl('/login');
    } else {
      this.generalError = 'Oops! Something went wrong!';
    }
  }

  public submitForm () {
    let formIsValid = true;
    Object.keys(this.values).map(key => {
      if(this.values[key] === ''){
        this[`${key}Error`] = `${key} is required`;
        formIsValid = false;
      }
    });
    if(formIsValid) {
      this.formSubmitted = true;
    }
  }

  public resetForm () {
    this.modelOptions = [];
    this.makesOptions = [];
    this.values = {
      manufacturer:  '',
      make: '',
      model: '',
    };
    this.formSubmitted = false;
  }
}
