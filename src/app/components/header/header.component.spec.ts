import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { NavComponent } from '../nav/nav.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, MockComponent(NavComponent), RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) },
        },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct image for dadJokeImg', () => {
    expect(component.dadJokeImg()).toEqual(
      'https://www.relativity.com/sites/relativity/cache/file/7D1131F6-208C-4423-B1A8FFADEF8AE53B.png'
    );
  });
});
