import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../components/card/card.component';
import { CharacterService } from '../../services/character.service';
import { CharacterData } from '../../data/model/character.model';
import { CounterService } from '../../state/counter.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homePath: string = 'assets/images/home.png';
  homeAlt: string = 'Favoritos';
  items: Array<CharacterData> = [];

  constructor(
    private characterService: CharacterService,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {
    this.getCharacters();

    this.counterService.currentCount.subscribe((favorites) => {
      this.updateFavorites(favorites);
    });
  }

  getCharacters() {
    this.characterService.getAll().subscribe((characters) => {
      this.items = characters.results;

      this.items.forEach((item) => {
        item.isFavorited = false;
      });

      let favorites = JSON.parse(
        localStorage.getItem('favorites_saved')!
      ) as CharacterData[];

      favorites.forEach((favorite) => {
        const index = this.items.findIndex((item) => item.id === favorite.id);
        if (index !== -1) {
          this.items[index].isFavorited = true;
        }
      });
    });
  }

  updateFavorites(favorites: CharacterData[]) {
    this.items.forEach((item) => {
      const isFavorite = favorites.some((favorite) => favorite.id === item.id);
      item.isFavorited = isFavorite;
    });
  }
}
