import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterData } from '../data/model/character.model';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private counterSource = new BehaviorSubject<CharacterData[]>([]);
  currentCount = this.counterSource.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  incrementCounter(data: CharacterData) {
    const updatedData = this.counterSource.value.map((character) =>
      character.id === data.id ? { ...character, isFavorited: true } : character
    );
    if (
      !this.counterSource.value.some((character) => character.id === data.id)
    ) {
      updatedData.push({ ...data, isFavorited: true });
    }
    this.counterSource.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }

  decrementCounter(id: number) {
    const updatedData = this.counterSource.value.filter(
      (character) => character.id !== id
    );
    this.counterSource.next(updatedData);
    this.saveToLocalStorage(updatedData);
  }

  private loadFromLocalStorage() {
    const savedData = localStorage.getItem('favorites_saved');
    if (savedData) {
      try {
        const parsedData: CharacterData[] = JSON.parse(savedData);
        this.counterSource.next(parsedData);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }

  private saveToLocalStorage(data: CharacterData[]) {
    try {
      localStorage.setItem('favorites_saved', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }
}
