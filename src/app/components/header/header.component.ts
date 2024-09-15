import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive } from '@angular/router';
import { CounterService } from '../../services/counter.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, MatIconModule, NgClass, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath: string = '';
  logoAlt: string = '';
  currentRoute: string = '';
  favoritesCounter?: number;
  currentLang: string = 'en';

  constructor(
    private counterService: CounterService,
    private translateService: TranslateService
  ) {}

  translatePage() {
    const lang = this.translateService.currentLang;
    this.currentLang = lang == undefined || lang == 'en' ? 'pt' : 'en';
    this.translateService.use(this.currentLang);
  }

  ngOnInit() {
    this.logoPath = 'assets/images/logo.png';
    this.logoAlt = 'Rick and Morty';
    this.currentRoute = window.location.pathname;

    this.counterService.currentCount.subscribe(
      (counter) => (this.favoritesCounter = counter.length)
    );
  }
}
