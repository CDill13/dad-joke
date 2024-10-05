import { ComponentFixture, TestBed } from '@angular/core/testing';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set signals correctly', () => {
    expect(component.codyLinkedIn()).toEqual(
      'https://www.linkedin.com/in/cody-dillman/'
    );
    expect(component.codyGitHub()).toEqual('https://github.com/CDill13');
    expect(component.faGitHub()).toEqual(faGithub);
    expect(component.faLinkedin()).toEqual(faLinkedin);
  });
});
