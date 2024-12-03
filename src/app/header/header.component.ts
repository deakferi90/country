import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
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
  dark: boolean = false;
  @Output() themeChanged = new EventEmitter<boolean>();

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = this.themeService.getThemeFromLocalStorage();
      this.dark = savedTheme === 'dark';

      this.applyThemeClasses();
    }
  }

  onThemeChange(isDark: boolean): void {
    this.dark = isDark;
    this.themeService.setThemeToLocalStorage(isDark ? 'dark' : 'light');

    if (isPlatformBrowser(this.platformId)) {
      this.applyThemeClasses();
    }
    this.themeChanged.emit(this.dark);
  }

  private applyThemeClasses(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.className = this.dark
        ? 'bg-body-dark text-white'
        : 'text-body-dark';
    }
  }
}
