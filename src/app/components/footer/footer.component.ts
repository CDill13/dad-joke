import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public codyLinkedIn = signal('https://www.linkedin.com/in/cody-dillman/');
  public codyGitHub = signal('https://github.com/CDill13');
  public faGitHub = signal(faGithub);
  public faLinkedin = signal(faLinkedin);
  public mobileSize = signal<boolean | undefined>(undefined);

  ngOnInit(): void {
    this.mobileSize.set(window.innerWidth < 769);
  }
}
