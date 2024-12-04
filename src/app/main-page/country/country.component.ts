import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  @Output() countryClick = new EventEmitter<string>(); // Emit event when a country is clicked

  onCountryClick(countryName: string): void {
    this.countryClick.emit(countryName); // Pass the clicked country's name to the parent
  }
}
