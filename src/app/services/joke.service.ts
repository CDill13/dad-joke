import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { IJoke } from '../components/utils/jokes.types';
import { ISearchResponse } from '../components/utils/jokes.types';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private jokeAPI = 'https://icanhazdadjoke.com/';
  private http = inject(HttpClient);

  public getRandomJoke(): Observable<IJoke> {
    return this.http.get<IJoke>(this.jokeAPI, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  public getJokesBySearch(searchTerm: string): Observable<IJoke[]> {
    return this.http
      .get<ISearchResponse>(this.jokeAPI + '/search?term=' + searchTerm, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .pipe(
        map((result: ISearchResponse) => {
          return result.results;
        })
      );
  }
}
