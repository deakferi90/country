import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: any;
  @Input() dark!: boolean;
  @Output() backToList = new EventEmitter<void>();

  selectedCountry: any;
  location = inject(Location);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCountry = null;

      const savedCountry = localStorage.getItem('selectedCountry');
      if (savedCountry) {
        this.selectedCountry = JSON.parse(savedCountry);
      }
    }
  }

  onBack() {
    this.location.back();
  }

  onCountrySelected(country: any) {
    this.selectedCountry = null;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedCountry', JSON.stringify(country));
    }
  }
}
