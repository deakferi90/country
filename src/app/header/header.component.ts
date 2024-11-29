import { Component, OnInit, Inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SwitchComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  dark: boolean = false; // Boolean flag to represent the current theme (light or dark)

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  ngOnInit(): void {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the current theme from the service
      this.dark = this.themeService.getCurrentTheme() === 'dark'; // Set dark or light based on service
      // Apply the theme to the document body
      document.body.className = this.dark ? 'dark' : 'light';
    }
  }

  // Method to update the theme based on the event from the child component
  onThemeChange(isDark: boolean): void {
    this.dark = isDark;
    // Save the new theme to localStorage and update the document body
    this.themeService.setThemeToLocalStorage(isDark ? 'dark' : 'light');

    if (isPlatformBrowser(this.platformId)) {
      document.body.className = isDark ? 'dark' : 'light';
    }
  }
}
