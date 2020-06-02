import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatInputModule
} from '@angular/material/core';

@NgModule({
    imports: [MatAutocompleteModule,MatInputModule],
    exports: [MatAutocompleteModule,MatInputModule]
})

export class AngularMaterialModule { }