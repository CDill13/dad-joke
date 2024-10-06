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
    jokeServiceSpy.getRandomJoke.and.returnValue(of(mockJoke));
    jokeServiceSpy.getPullMyFingerJoke.and.returnValue({
      question: 'test-question',
      punchline: 'test-punchline'}
    );

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

    it('should call getPullMyFingerJoke if init is false', () => {
      component.getJoke();
      expect(jokeServiceSpy.getPullMyFingerJoke).toHaveBeenCalledWith();
    });

    it('should not call getPullMyFingerJoke if init is true', () => {
      component.getJoke(true);
      expect(jokeServiceSpy.getPullMyFingerJoke).not.toHaveBeenCalled();
    });
  });
});
