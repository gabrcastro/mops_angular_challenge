import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CharacterData } from '../../data/model/character.model';
import { CounterService } from '../../state/counter.state';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favoritesPath: string = '';
  favoritesAlt: string = '';
  items: Array<CharacterData> = [];

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.favoritesPath = 'assets/images/favorites.png';
    this.favoritesAlt = 'Favoritos';
    this.counterService.currentCount.subscribe((data) => {
      this.items = data;
    });
  }
}
