import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize the currentTheme from localStorage if available, else default to 'light'
    this.currentTheme = this.getThemeFromLocalStorage() || 'light';
  }

  getThemeFromLocalStorage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme');
    }
    return null;
  }

  setThemeToLocalStorage(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  toggleTheme(): void {
    // Toggle theme between 'light' and 'dark'
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    // Save the new theme to localStorage
    this.setThemeToLocalStorage(this.currentTheme);
    // Apply the theme to the document body
    document.body.className = this.currentTheme;
  }

  // Optional: method to get the current theme
  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
