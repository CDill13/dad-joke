import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';
import { JokeService } from '../../services/joke.service';
import { JokePageComponent } from './joke-page.component';
import { IJoke } from '../utils/jokes.types';

describe('JokePageComponent', () => {
  let component: JokePageComponent;
  let fixture: ComponentFixture<JokePageComponent>;
  let jokeServiceSpy: Spy<JokeService>;
  let activatedRouteStub: any;

  const mockJoke: IJoke = { id: 'test-id-1', joke: 'Test joke' };

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService, {
      methodsToSpyOn: ['getJokeById'],
    });
    jokeServiceSpy.getJokeById.and.returnValue(of(mockJoke));

    activatedRouteStub = { params: of({ jokeId: 'test-id-1' }) };

    TestBed.configureTestingModule({
      imports: [JokePageComponent],
      providers: [
        { provide: JokeService, useValue: jokeServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokePageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the background color based on the jokeId', () => {
    component.ngOnInit();
    expect(component.starColor()).toBe('rgb(24,48,72)');
  });

  it('should fetch the joke by id on init', () => {
    jokeServiceSpy.getJokeById.and.returnValue(of(mockJoke));

    component.ngOnInit();

    expect(jokeServiceSpy.getJokeById).toHaveBeenCalledWith('test-id-1');
    expect(component.joke()).toEqual(mockJoke);
  });
});
