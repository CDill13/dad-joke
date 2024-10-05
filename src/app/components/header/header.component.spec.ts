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
});
