import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { IJoke, IPullMyFingerJoke } from '../components/utils/jokes.types';
import { ISearchResponse } from '../components/utils/jokes.types';

const JOKE_BASE_URL = 'https://icanhazdadjoke.com';
const PULL_MY_FINGER_JOKES: IPullMyFingerJoke[] = [
  {
    question: `Why shouldn’t you ever fart on an elevator?`,
    punchline: `Because it’s wrong on so many levels!`
  },
  {
    question: 'What do you call someone who never farts in public?',
    punchline: 'A private tutor!'
  },
  {
    question: 'Why do farts smell?',
    punchline: 'So that deaf people can enjoy them too!'
  },
  {
    question: `What’s invisible and smells like carrots?`,
    punchline: 'Bunny farts!'
  },
  {
    question: 'Why did the kid bring a ladder to school?',
    punchline: 'Because he wanted to go to high school and let out some high farts!'
  }
]

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
      .pipe(map((result: ISearchResponse) => result.results));
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

  public getPullMyFingerJoke(): IPullMyFingerJoke {
    const randomIndex = Math.floor(Math.random() * PULL_MY_FINGER_JOKES.length);
    return PULL_MY_FINGER_JOKES[randomIndex];
  }
}
