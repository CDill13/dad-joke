import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { GenerateJokesComponent } from '../generate-jokes/generate-joke.component';
import { JokeSearchComponent } from '../joke-search/joke-search.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(GenerateJokesComponent),
        MockComponent(JokeSearchComponent),
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the home component', () => {
    expect(component).toBeTruthy();
  });
});
