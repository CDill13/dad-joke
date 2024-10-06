import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public mobileSize = window.innerWidth < 769;
  public faHeart = signal(faHeart);
  public faMagnifyingGlass = signal(faMagnifyingGlass);
  public faHouse = signal(faHouse);
}
