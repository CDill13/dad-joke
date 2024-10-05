import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { IJoke } from '../components/utils/jokes.types';
import { ISearchResponse } from '../components/utils/jokes.types';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private jokeBaseURL = 'https://icanhazdadjoke.com/';
  private http = inject(HttpClient);
  private jsonHeaders = new HttpHeaders({ Accept: 'application/json' });

  public getRandomJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.jokeBaseURL, {
      headers: this.jsonHeaders,
    });
  }

  public getJokesBySearch(searchTerm: string): Observable<IJoke[]> {
    return this.http
      .get<ISearchResponse>(this.jokeBaseURL + '/search?term=' + searchTerm, {
        headers: this.jsonHeaders,
      })
      .pipe(
        map((result: ISearchResponse) => {
          return result.results;
        })
      );
  }

  public getJokeById(id: string): Observable<IJoke> {
    return this.http.get<IJoke>(this.jokeBaseURL + '/j/' + id, {
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

  public removeFromFavorites(id: IJoke['id']) {
    let savedJokes: IJoke[] = this.getFavorites().filter(
      (joke: IJoke) => joke.id !== id
    );
    localStorage.setItem('favorites', JSON.stringify(savedJokes));
    return this.getFavorites();
  }
}
