import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateJokesComponent } from './generate-jokes.component';

describe('GenerateJokesComponent', () => {
  let component: GenerateJokesComponent;
  let fixture: ComponentFixture<GenerateJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateJokesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
