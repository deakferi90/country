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
    // Load countries
    this.http.get(this.dataUrl).subscribe((data) => {
      this.countries = data;
      this.filterCountries = data;

      // Retrieve the selected region and search text from localStorage (browser only)
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedRegion = localStorage.getItem('selectedRegion');
        const savedSearchText = localStorage.getItem('searchText');

        if (savedRegion) {
          this.selectedRegion = savedRegion;
        }

        if (savedSearchText) {
          this.searchText = savedSearchText;
        }

        // Apply the filter for region and search
        this.filterCountries = this.applyFilters();
      }
    });
  }

  filterByRegion(): void {
    // Save selected region to localStorage (browser only)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('selectedRegion', this.selectedRegion);
    }

    this.filterCountries = this.applyFilters();
  }

  applyFilters(): any[] {
    return this.countries.filter(
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

  onSearchTextChange(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('searchText', this.searchText);
    }

    this.filterCountries = this.applyFilters();
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
    this.router.navigate([`/country/${this.selectedCountry.name}`]);
    setTimeout(() => {
      window.location.reload();
    }, 0);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );
    }
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
