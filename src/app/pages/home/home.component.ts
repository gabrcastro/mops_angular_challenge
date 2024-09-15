import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CardComponent } from '../../components/card/card.component';
import { CharacterService } from '../../services/character.service';
import { CharacterData } from '../../data/model/character.model';
import { CounterService } from '../../services/counter.service';
import { SearchComponent } from '../../components/search/search.component';
import { SearchService } from '../../services/search.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SearchComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homePath: string = 'assets/images/home.png';
  homeAlt: string = 'Favoritos';
  items: CharacterData[] = [];
  filteredItems: CharacterData[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private characterService: CharacterService,
    private counterService: CounterService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);

    this.counterService.currentCount.subscribe((favorites) => {
      this.updateFavorites(favorites);
    });

    this.searchService.searchResults.subscribe((results) => {
      if (results && results.results) {
        this.items = results.results;
        this.filteredItems = this.items;
        this.updateFavoritesFromSearch();
      } else {
        this.filteredItems = [];
      }
    });
  }

  getCharacters(page: number) {
    this.characterService.getAll(page).subscribe((characters) => {
      console.log('total', characters);

      this.items = characters.results;
      this.filteredItems = this.items;
      this.totalPages = characters.info.pages;

      this.filteredItems.forEach((item) => {
        item.isFavorited = false;
      });

      let favorites = JSON.parse(
        localStorage.getItem('favorites_saved')!
      ) as CharacterData[];

      favorites.forEach((favorite) => {
        const index = this.filteredItems.findIndex(
          (item) => item.id === favorite.id
        );
        if (index !== -1) {
          this.filteredItems[index].isFavorited = true;
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

  updateFavoritesFromSearch() {
    let favorites = JSON.parse(
      localStorage.getItem('favorites_saved')!
    ) as CharacterData[];

    this.filteredItems.forEach((item) => {
      const isFavorite = favorites.some((favorite) => favorite.id === item.id);
      item.isFavorited = isFavorite;
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCharacters(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCharacters(this.currentPage);
    }
  }
}
