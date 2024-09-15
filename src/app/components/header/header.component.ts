import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLinkActive } from '@angular/router';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, MatIconModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath: string = '';
  logoAlt: string = '';
  currentRoute: string = '';
  favoritesCounter?: number;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.logoPath = 'assets/images/logo.png';
    this.logoAlt = 'Logo Rick and Morty';
    this.currentRoute = window.location.pathname;

    this.counterService.currentCount.subscribe(
      (counter) => (this.favoritesCounter = counter.length)
    );
  }
}
