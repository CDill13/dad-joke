import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';
import { JokeService } from '../../services/joke.service';
import { JokeSearchComponent } from './joke-search.component';
import { IJoke } from '../utils/jokes.types';

describe('JokeSearchComponent', () => {
  let component: JokeSearchComponent;
  let fixture: ComponentFixture<JokeSearchComponent>;
  let jokeServiceSpy: Spy<JokeService>;
  let formBuilder: FormBuilder;

  const mockJokes: IJoke[] = [
    { id: 'test-id-1', joke: 'Test joke 1' },
    { id: 'test-id-2', joke: 'Test joke 2' },
  ];

  beforeEach(() => {
    jokeServiceSpy = createSpyFromClass(JokeService);
    formBuilder = new FormBuilder();

    TestBed.configureTestingModule({
      imports: [JokeSearchComponent, ReactiveFormsModule],
      providers: [
        { provide: JokeService, useValue: jokeServiceSpy },
        { provide: FormBuilder, useValue: formBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JokeSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.jokeSearchForm instanceof UntypedFormGroup).toBeTrue();
    expect(component.jokeSearchForm?.value.searchTerm).toBe('');
    expect(component.faMagnifyingGlass()).toEqual(faMagnifyingGlass);
  });

  it('should alert and not search when searchTerm is empty', () => {
    spyOn(window, 'alert');
    component.jokeSearchForm = formBuilder.group({ searchTerm: [''] });

    component.searchJokes();

    expect(window.alert).toHaveBeenCalledWith(
      "C'mon now, Champ, you gotta tell me what you want to chuckle at!"
    );
    expect(jokeServiceSpy.getJokesBySearch).not.toHaveBeenCalled();
  });

  it('should search for jokes when searchTerm is provided', () => {
    jokeServiceSpy.getJokesBySearch.and.returnValue(of(mockJokes));
    component.jokeSearchForm = formBuilder.group({ searchTerm: ['funny'] });

    component.searchJokes();

    expect(jokeServiceSpy.getJokesBySearch).toHaveBeenCalledWith('funny');
    expect(component.searchedJokes()).toEqual(mockJokes);
  });
});
