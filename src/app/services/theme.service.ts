import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setThemeToLocalStorage(this.currentTheme);
    document.body.className = this.currentTheme;
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
