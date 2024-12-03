import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountryComponent } from './country/country.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CountryComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  @Input() dark!: boolean;
  searchText = '';
  isDropdownOpen = false;
  selectedContinent: string | undefined;
  dataUrl = 'assets/data.json';
  countries: any = [];
  continents: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.dataUrl).subscribe((data) => {
      this.countries = data;
    });
  }

  filteredCountries(): any[] {
    return this.countries.filter((country: { name: string }) =>
      country.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
