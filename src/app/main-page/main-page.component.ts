import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountryComponent } from './country/country.component';
import { HttpClient } from '@angular/common/http';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NavigationEnd, Router } from '@angular/router';

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
    CountryDetailsComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  @Input() dark!: boolean;
  searchText: string = '';
  selectedRegion: string = 'All';
  isDropdownOpen = false;
  dataUrl = 'assets/data.json';
  selectedCountry: any = null;
  countries: any = [];
  filterCountries: any = [];
  currentRoute: string = '';
  continents: string[] = [
    'Africa',
    'All',
    'Americas',
    'Asia',
    'Europe',
    'Polar',
    'Oceania',
  ];

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.http.get(this.dataUrl).subscribe((data) => {
      this.countries = data;
      this.filterCountries = data;
    });
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
    this.router.navigate([`/country/${this.selectedCountry.name}`]);
    localStorage.setItem(
      'selectedCountry',
      JSON.stringify(this.selectedCountry)
    );
  }

  onBackToCountryList() {
    this.selectedCountry = null;
  }

  redirect() {
    this.router.navigate(['/']);
  }

  filteredCountries(): void {
    this.filterCountries = this.countries.filter(
      (country: { region: string; name: string }) => {
        const isRegionMatch =
          this.selectedRegion === 'All' ||
          country.region === this.selectedRegion;
        const isSearchMatch = country.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

        return isRegionMatch && isSearchMatch;
      }
    );
  }

  filterByRegion(): void {
    if (this.selectedRegion === 'All') {
      this.filterCountries = this.countries.filter(
        (country: { name: string }) =>
          country.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredCountries();
    }
  }

  onSearchTextChange(): void {
    this.filteredCountries();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
