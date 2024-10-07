import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { of } from 'rxjs';

import { JokeService } from '../../services/joke.service';
import { JokeStarComponent } from './joke-star.component';

import { IJoke } from '../utils/jokes.types';

describe('JokeStarComponent', () => {
  let component: JokeStarComponent;
  let fixture: ComponentFixture<JokeStarComponent>;
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
      imports: [JokeStarComponent],
      providers: [
        { provide: JokeService, useValue: jokeServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeStarComponent);
    fixture.componentRef.setInput('joke', mockJoke);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the background color based on the jokeId', () => {
    expect(component.starColor()).toBe('rgb(24,48,72)');
  });
});
