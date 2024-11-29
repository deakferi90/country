import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SwitchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentTheme: string = ''; // We'll store the current theme here

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Initialize the currentTheme from the service
    this.currentTheme = this.themeService.getCurrentTheme();

    // Apply the theme to the document body only in the browser
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = this.currentTheme;
    }
  }

  // Method to toggle theme
  onThemeToggle(): void {
    this.themeService.toggleTheme();
    // Update the currentTheme variable after toggling
    this.currentTheme = this.themeService.getCurrentTheme();
  }
}
