import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  @Input() dark!: boolean;
  isDropdownOpen = false;
  selectedContinent: string | undefined;
  dataUrl = 'assets/data.json';
  continents: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.dataUrl).subscribe((data) => {
      console.log(data);
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
}
