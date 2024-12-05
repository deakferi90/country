import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class CountryDetailsComponent implements OnInit {
  @Input() country: any;
  @Input() dark!: boolean;
  @Output() backToList = new EventEmitter<void>();
  selectedCountry: any;

  constructor(private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedCountry = localStorage.getItem('selectedCountry');

      if (savedCountry) {
        this.selectedCountry = JSON.parse(savedCountry);
      }
    }
  }

  onBack() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
