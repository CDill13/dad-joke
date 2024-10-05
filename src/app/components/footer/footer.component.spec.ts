import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set signals correctly', () => {
    expect(component.codyLinkedIn()).toEqual('https://www.linkedin.com/in/cody-dillman/');
    expect(component.linkedInImage()).toEqual('https://i.pinimg.com/originals/86/32/54/863254f8c36146219554977cc345d584.png');
    expect(component.codyGitHub()).toEqual('https://github.com/CDill13');
    expect(component.gitHubImage()).toEqual('https://cdn-icons-png.flaticon.com/512/25/25231.png');
  })
});
