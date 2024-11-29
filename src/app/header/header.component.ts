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
  dark: boolean = false;

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.dark = this.themeService.getCurrentTheme() === 'dark';
      document.body.className = this.dark ? 'dark' : 'light';
    }
  }

  onThemeChange(isDark: boolean): void {
    this.dark = isDark;
    this.themeService.setThemeToLocalStorage(isDark ? 'dark' : 'light');

    if (isPlatformBrowser(this.platformId)) {
      document.body.className = isDark ? 'dark' : 'light';
    }
  }
}
