import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {  } from 'events';
import { Observable } from 'rxjs';
@Component({
  selector: 'autocomplete-dropdown',
  templateUrl: 'autocomplete-dropdown.html',
  styleUrls: ['autocomplete-dropdown.scss']
})
export class AutocompleteDropdownComponent implements OnInit, OnChanges {
  @Input() placeholder: string;
  @Input() displayWith: Function;
  @Input() options: any[];
  @Input() filterField: string;
  @Input() error: string;
  @Output() onSelectionChange = new EventEmitter();

  @ViewChild("input", { static: false }) input: ElementRef;
  

  public filteredOptions: string[];

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && this.input) {
      this.filteredOptions = changes.options.currentValue;
      this.input.nativeElement.value = '';
    }
    
  }

  ngOnInit(): void {
    
  }

  onInputChange (e) {
    const str = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(option => option[this.filterField].toLowerCase().indexOf(str) === 0);
  }
  onChange (e) {
    this.onSelectionChange.emit(e)
  }
}
