import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CounterService } from '../../state/counter.state';
import { CharacterData } from '../../data/model/character.model';
import { CharacterService } from '../../services/character.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() public character?: CharacterData;

  constructor(
    private counterService: CounterService,
    private characterService: CharacterService
  ) {}

  addFavorite(character: CharacterData) {
    this.counterService.incrementCounter(character);
  }

  removeFavorite(characterId: number) {
    this.counterService.decrementCounter(characterId);
  }

  getCharacter(id: number) {
    this.characterService.getOne(id).subscribe((character) => {
      this.save(character);
    });
  }

  saveCharacter(data: CharacterData) {
    this.addFavorite(data);
    this.getCharacter(data.id);
  }

  save(character?: CharacterData) {
    try {
      if (character) {
        let list: CharacterData[] = [];

        if (localStorage.getItem('favorites_saved')) {
          list = JSON.parse(localStorage.getItem('favorites_saved')!);
        }

        character.isFavorited = true;
        const index = list.findIndex((item) => item.id === character.id);

        if (index === -1) {
          // If the item is not in the list, add
          list.push(character);
        } else {
          list[index] = character;
        }
        localStorage.setItem('favorites_saved', JSON.stringify(list));
      }
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }
}
