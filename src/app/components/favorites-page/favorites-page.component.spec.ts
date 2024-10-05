import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';
import { JokeService } from '../../services/joke.service';
import { IJoke } from '../utils/jokes.types';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let jokeServiceSpy: Spy<JokeService>;

  const mockFavoriteJokes: IJoke[] = [
    { id: 'test-id-1', joke: 'Mock joke 1' },
    { id: 'test-id-2', joke: 'Mock joke 2' },
  ];

  beforeEach(() => {
    // Create a spy for JokeService using jasmine-auto-spies
    jokeServiceSpy = createSpyFromClass(JokeService);

    // Set the return values for the spy methods
    jokeServiceSpy.getFavorites.and.returnValue(mockFavoriteJokes);
    jokeServiceSpy.removeFromFavorites.and.returnValue(mockFavoriteJokes.slice(1));

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
    component.removeFromFavorites('test-id-1');

    expect(jokeServiceSpy.removeFromFavorites).toHaveBeenCalledWith('test-id-1');
    expect(component.favoriteJokes()).toEqual([mockFavoriteJokes[1]]);
  });
});
