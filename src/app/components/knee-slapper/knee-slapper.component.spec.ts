import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { JokeService } from '../../services/joke.service';
import { KneeSlapperComponent } from './knee-slapper.component';
import { IJoke } from '../utils/jokes.types';

describe('KneeSlapperComponent', () => {
  let component: KneeSlapperComponent;
  let fixture: ComponentFixture<KneeSlapperComponent>;
  let jokeServiceSpy: Spy<JokeService>;

  const mockJoke: IJoke = { id: 'test-id-1', joke: 'Test joke 1' };

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService);

    TestBed.configureTestingModule({
      imports: [KneeSlapperComponent, ReactiveFormsModule],
      providers: [{ provide: JokeService, useValue: jokeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(KneeSlapperComponent);
    fixture.componentRef.setInput('joke', mockJoke);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set faHeart correctly', () => {
    expect(component.faHeart()).toEqual(faHeart);
  });

  it('should not save a joke to favorites if joke is undefined', () => {
    fixture.componentRef.setInput('joke', undefined);

    component.saveToFavorites();

    expect(jokeServiceSpy.saveToFavorites).not.toHaveBeenCalled();
  });

  it('should save a joke to favorites if joke is defined', () => {
    component.saveToFavorites();

    expect(jokeServiceSpy.saveToFavorites).toHaveBeenCalledWith(mockJoke);
  });
});
