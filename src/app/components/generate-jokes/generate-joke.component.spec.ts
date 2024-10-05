import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';

import { JokeService } from '../../services/joke.service';
import { GenerateJokesComponent } from './generate-joke.component';
import { IJoke } from '../utils/jokes.types';

describe('GenerateJokesComponent', () => {
  let component: GenerateJokesComponent;
  let fixture: ComponentFixture<GenerateJokesComponent>;
  let jokeServiceSpy: Spy<JokeService>;

  const mockJoke: IJoke = { id: 'test-id-1', joke: 'This is a test joke' };

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService);

    TestBed.configureTestingModule({
      imports: [GenerateJokesComponent],
      providers: [{ provide: JokeService, useValue: jokeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateJokesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getJoke', () => {
    it('should fetch a random joke and set the joke signal', () => {
      jokeServiceSpy.getRandomJoke.and.returnValue(of(mockJoke));

      component.getJoke();

      expect(jokeServiceSpy.getRandomJoke).toHaveBeenCalled();
      expect(component.joke()).toEqual(mockJoke);
    });
  });

  describe('saveToFavorites', () => {
    it('should not save to favorites if joke is undefined', () => {
      spyOn(window, 'alert');
      component.joke.set(undefined);

      component.saveToFavorites();

      expect(jokeServiceSpy.saveToFavorites).not.toHaveBeenCalled();
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should save the joke to favorites and show an alert when joke is defined', () => {
      spyOn(window, 'alert');
      component.joke.set(mockJoke);

      component.saveToFavorites();

      expect(jokeServiceSpy.saveToFavorites).toHaveBeenCalledWith(mockJoke);
      expect(window.alert).toHaveBeenCalledWith(
        'Since you like it so much you can read it in your favorites any time you like, sport!'
      );
    });
  });
});
