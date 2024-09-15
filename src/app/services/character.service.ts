import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  CharacterData,
  CharacterResponse,
} from '../data/model/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CharacterResponse> {
    return this.httpClient.get<CharacterResponse>(`${this.url}/character`);
  }

  getOne(id: number): Observable<CharacterData> {
    return this.httpClient.get<CharacterData>(`${this.url}/character/${id}`);
  }
}
