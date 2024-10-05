import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public codyLinkedIn = signal('https://www.linkedin.com/in/cody-dillman/');
  public linkedInImage = signal('https://i.pinimg.com/originals/86/32/54/863254f8c36146219554977cc345d584.png');
  public codyGitHub = signal('https://github.com/CDill13');
  public gitHubImage = signal('https://cdn-icons-png.flaticon.com/512/25/25231.png');
}
