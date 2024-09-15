import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import {
  CharacterData,
  CharacterResponse,
} from '../data/model/character.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchSubject = new Subject<string>();
  private searchResultsSource = new BehaviorSubject<CharacterResponse>(
    {} as CharacterResponse
  );
  searchResults = this.searchResultsSource.asObservable();

  constructor(private characterService: CharacterService) {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(), // Only issues if the value has changed
        switchMap((searchTerm) =>
          this.characterService.searchCharacters(searchTerm)
        )
      )
      .subscribe((results) => {
        this.searchResultsSource.next(results as CharacterResponse);
      });
  }

  search(term: string): void {
    this.searchSubject.next(term);
  }
}
