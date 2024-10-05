import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { JokeComponent } from './joke.component';
import { IJoke } from '../utils/jokes.types';

describe('JokeComponent', () => {
  let component: JokeComponent;
  let fixture: ComponentFixture<JokeComponent>;
  let routerSpy: Spy<Router>;

  const mockJoke: IJoke = { id: 'test-id-1', joke: 'This is a test joke' };

  beforeEach(() => {
    routerSpy = createSpyFromClass(Router);

    TestBed.configureTestingModule({
      imports: [JokeComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the joke page with the joke id', () => {
    fixture.componentRef.setInput('joke', mockJoke);
    component.goToJokePage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/joke-page', 'test-id-1']);
  });

  it('should not navigate if the joke is undefined', () => {
    fixture.componentRef.setInput('joke', undefined);
    component.goToJokePage();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
