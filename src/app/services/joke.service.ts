import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { IJoke } from '../components/utils/jokes.types';
import { ISearchResponse } from '../components/utils/jokes.types';

const JOKE_BASE_URL = 'https://icanhazdadjoke.com';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({ Accept: 'application/json' });

  public getRandomJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(JOKE_BASE_URL, {
      headers: this.jsonHeaders,
    });
  }

  public getJokesBySearch(searchTerm: string): Observable<IJoke[]> {
    return this.http
      .get<ISearchResponse>(`${JOKE_BASE_URL}/search?term=${searchTerm}`, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((result: ISearchResponse) => result.results)
      );
  }

  public getJokeById(id: string): Observable<IJoke> {
    return this.http.get<IJoke>(`${JOKE_BASE_URL}/j/${id}`, {
      headers: this.jsonHeaders,
    });
  }

  public getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  public saveToFavorites(newJoke: IJoke) {
    let savedJokes: IJoke[] = this.getFavorites().filter(
      (joke: IJoke) => joke.id !== newJoke.id
    );
    savedJokes.push(newJoke);
    return localStorage.setItem('favorites', JSON.stringify(savedJokes));
  }

  public removeFromFavorites(joke: IJoke) {
    let savedJokes: IJoke[] = this.getFavorites().filter(
      (savedJoke: IJoke) => savedJoke.id !== joke.id
    );
    localStorage.setItem('favorites', JSON.stringify(savedJokes));
    return this.getFavorites();
  }
}
