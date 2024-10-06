import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { JokeService } from './joke.service';
import { IJoke, IPullMyFingerJoke, ISearchResponse } from '../components/utils/jokes.types';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { uniq } from 'lodash';

describe('JokeService', () => {
  let service: JokeService;
  let httpMock: HttpTestingController;

  const mockJoke: IJoke = { id: 'test-id-1', joke: 'A test joke' };
  const mockSearchResponse: ISearchResponse = {
    results: [mockJoke],
    total_jokes: 1,
    current_page: 1,
  } as ISearchResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JokeService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(JokeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve a random joke', () => {
    service.getRandomJoke().subscribe((joke) => {
      expect(joke).toEqual(mockJoke);
    });

    const req = httpMock.expectOne('https://icanhazdadjoke.com');
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);
  });

  it('should retrieve jokes by search term', () => {
    const searchTerm = 'test';
    service.getJokesBySearch(searchTerm).subscribe((jokes) => {
      expect(jokes).toEqual([mockJoke]);
    });

    const req = httpMock.expectOne(
      `https://icanhazdadjoke.com/search?term=${searchTerm}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockSearchResponse);
  });

  it('should retrieve a joke by ID', () => {
    service.getJokeById(mockJoke.id).subscribe((joke) => {
      expect(joke).toEqual(mockJoke);
    });

    const req = httpMock.expectOne(
      `https://icanhazdadjoke.com/j/${mockJoke.id}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockJoke);
  });

  it('should get favorites from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([mockJoke]));
    const favorites = service.getFavorites();
    expect(favorites).toEqual([mockJoke]);
  });

  it('should save a joke to favorites', () => {
    spyOn(localStorage, 'setItem');
    service.saveToFavorites(mockJoke);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([mockJoke])
    );
  });

  it('should remove a joke from favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockJoke]));
    spyOn(localStorage, 'setItem').and.callThrough();

    const updatedFavorites = service.removeFromFavorites(mockJoke);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([])
    );
    expect(updatedFavorites).toEqual([]);
  });

  describe('getPullMyFingerJoke', () => {
    it('should return a joke', () => {
      const joke: IPullMyFingerJoke = service.getPullMyFingerJoke();
      expect(joke).toBeDefined();
    });

    it('should return a joke when called multiple times', () => {
      const jokes = new Set<IPullMyFingerJoke>();

      for (let i = 0; i < 10; i++) {
        const joke: IPullMyFingerJoke = service.getPullMyFingerJoke();
        jokes.add(joke);
      }

      expect(jokes.size).toBeLessThanOrEqual(5);
    });
  })

  afterEach(() => {
    httpMock.verify();
  });
});
