import { TestBed, ComponentFixture } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { JokeService } from '../../services/joke.service';
import { FavoritesPageComponent } from './favorites-page.component';
import { IJoke } from '../utils/jokes.types';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let jokeServiceSpy: Spy<JokeService>;

  const mockFavoriteJokes: IJoke[] = [
    { id: 'test-id-1', joke: 'Mock joke 1' },
    { id: 'test-id-2', joke: 'Mock joke 2' },
  ];

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService);

    jokeServiceSpy.getFavorites.and.returnValue(mockFavoriteJokes);
    jokeServiceSpy.removeFromFavorites.and.returnValue(
      mockFavoriteJokes.slice(1)
    );

    TestBed.configureTestingModule({
      imports: [FavoritesPageComponent],
      providers: [{ provide: JokeService, useValue: jokeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize favoriteJokes on ngOnInit', () => {
    component.ngOnInit();

    expect(jokeServiceSpy.getFavorites).toHaveBeenCalled();
    expect(component.favoriteJokes()).toEqual(mockFavoriteJokes);
  });

  it('should remove a joke from favorites', () => {
    component.ngOnInit();
    component.removeFromFavorites(mockFavoriteJokes[0]);

    expect(jokeServiceSpy.removeFromFavorites).toHaveBeenCalledWith(
      mockFavoriteJokes[0]
    );
    expect(component.favoriteJokes()).toEqual([mockFavoriteJokes[1]]);
  });
});
