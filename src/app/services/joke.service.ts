import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../components/models/joke';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private jokeAPI = 'https://icanhazdadjoke.com/';
  private http = inject(HttpClient);

  public getRandomJoke(): Observable<Joke> {    
    return this.http.get<Joke>(this.jokeAPI, {headers: new HttpHeaders({'Accept': 'application/json'})}).pipe()
  }

  public getJokeBySearch(searchTerm: string): Observable<Joke> {
    return this.http.get<Joke>(this.jokeAPI + '/search?term=' + searchTerm, {headers: new HttpHeaders({'Accept': 'application/json'})}).pipe()
  }
}
