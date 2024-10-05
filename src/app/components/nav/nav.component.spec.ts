import { ActivatedRoute, RouterLink } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { of } from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NavComponent,
        RouterLink
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }
        }
      ]
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create the nav component', () => {
    expect(component).toBeTruthy();
  });
});
