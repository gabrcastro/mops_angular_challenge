import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  CharacterData,
  CharacterResponse,
} from '../data/model/character.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  getAll(page: number = 1): Observable<CharacterResponse> {
    return this.httpClient.get<CharacterResponse>(
      `${this.url}/character/?page=${page}`
    );
  }

  getOne(id: number): Observable<CharacterData> {
    return this.httpClient.get<CharacterData>(`${this.url}/character/${id}`);
  }

  searchCharacters(term: string) {
    return this.httpClient
      .get<CharacterResponse>(`${this.url}/character/?name=${term}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar personagens:', error);
          return of({
            results: [],
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
          });
        })
      );
  }
}
