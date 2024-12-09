import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountryComponent } from './country/country.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

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
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @Input() dark!: boolean;
  searchText: string = '';
  selectedRegion: string = 'Africa';
  isDropdownOpen = false;
  dataUrl = 'assets/data.json';
  selectedCountry: any = null;
  countries: any = [];
  filterCountries: any = [];
  currentRoute: string = '';
  continents: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Polar',
    'Oceania',
  ];

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.selectedCountry = null;
        }
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.http.get(this.dataUrl).subscribe((data) => {
      this.countries = data;
      this.filterCountries = data;

      if (typeof window !== 'undefined' && window.localStorage) {
        const savedRegion = localStorage.getItem('selectedRegion');
        const savedSearchText = localStorage.getItem('searchText');

        if (savedRegion) {
          this.selectedRegion = savedRegion;
        }

        if (savedSearchText) {
          this.searchText = savedSearchText;
        }

        this.filterCountries = this.applyFilters();
      }
    });
  }

  filterByRegion(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('selectedRegion', this.selectedRegion);
    }

    this.filterCountries = this.applyFilters();
  }

  applyFilters(): any[] {
    return this.countries.filter(
      (country: { region: string; name: string }) => {
        const isRegionMatch = country.region === this.selectedRegion;
        const isSearchMatch = country.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

        return isRegionMatch && isSearchMatch;
      }
    );
  }

  onSearchTextChange(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('searchText', this.searchText);
    }

    this.filterCountries = this.applyFilters();
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('dark', JSON.stringify(this.dark));
      localStorage.setItem(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );
    }

    this.router.navigate([`/country/${this.selectedCountry.name}`]);
  }

  onBackToCountryList(): void {
    this.selectedCountry = null;
    this.router.navigate(['/']);
  }

  redirect(): void {
    this.selectedCountry = null;
    this.router.navigate(['/']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
