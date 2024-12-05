import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent {
  @Input() searchText!: string;
  @Input() dark!: boolean;
  @Input() countries: any = [];
  @Input() filterCountries: any = [];
  @Output() countrySelected = new EventEmitter<string>();

  onSelectCountry(country: string): void {
    this.countrySelected.emit(country);
  }
}
