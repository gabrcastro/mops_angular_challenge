import { Component } from '@angular/core';
import { CardComponent, Character } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favoritesPath: string = 'assets/images/favorites.png';
  favoritesAlt: string = 'Favoritos';

  items: Array<Character> = [
    {
      image: null,
      name: 'Rick Chanshez',
      type: 'Human',
      favorite: true,
    },
    {
      image: null,
      name: 'Rick Chanshez',
      type: 'Human',
      favorite: true,
    },
    {
      image: null,
      name: 'Rick Chanshez',
      type: 'Human',
      favorite: true,
    },
  ];
}
