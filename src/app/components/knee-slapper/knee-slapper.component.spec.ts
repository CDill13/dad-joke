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

  const mockJokes: IJoke[] = [
    { id: 'test-id-1', joke: 'Test joke 1' },
    { id: 'test-id-2', joke: 'Test joke 2' }
  ];

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService);
    jokeServiceSpy.getFavorites.and.returnValue(mockJokes);

    TestBed.configureTestingModule({
      imports: [KneeSlapperComponent, ReactiveFormsModule],
      providers: [{ provide: JokeService, useValue: jokeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(KneeSlapperComponent);
    fixture.componentRef.setInput('joke', mockJokes[0]);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('isFavorite', () => {
    it('should be set to true when getFavorites returns the inputted joke', () => {
      jokeServiceSpy.getFavorites.and.returnValue(mockJokes);
      component.ngOnInit();
      expect(component.isFavorite()).toBeTrue();
    });

    it('should be set to false when getFavorites does not return the inputted joke', () => {
      jokeServiceSpy.getFavorites.and.returnValue([mockJokes[1]]);
      component.ngOnInit();
      expect(component.isFavorite()).toBeFalse();
    });
  })

  it('should set faHeart correctly', () => {
    expect(component.faHeart()).toEqual(faHeart);
  });

  it('should not save a joke to favorites if joke is undefined', () => {
    component.isFavorite.set(false);
    fixture.componentRef.setInput('joke', undefined);

    component.saveToFavorites();

    expect(jokeServiceSpy.saveToFavorites).not.toHaveBeenCalled();
  });

  it('should not save a joke to favorites if isFavorite is set to true', () => {
    component.isFavorite.set(true);
    component.saveToFavorites();
    expect(jokeServiceSpy.saveToFavorites).not.toHaveBeenCalled();
  });

  it('should save a joke to favorites if joke is defined and isFavorite is set to false and set isFavorite to true', () => {
    component.isFavorite.set(false);
    component.saveToFavorites();

    expect(jokeServiceSpy.saveToFavorites).toHaveBeenCalledWith(mockJokes[0]);

    expect(component.isFavorite()).toBeTrue();
  });
});
