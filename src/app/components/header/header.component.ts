import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public dadJokeImg = signal(
    'https://www.relativity.com/sites/relativity/cache/file/7D1131F6-208C-4423-B1A8FFADEF8AE53B.png'
  );
}
