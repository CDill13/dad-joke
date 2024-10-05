import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';

import { JokeService } from '../../services/joke.service';
import { JokeComponent } from '../joke/joke.component';
import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [JokeComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  public favoriteJokes = signal<IJoke[]>([]);

  constructor(private jokeService: JokeService) {}

  public ngOnInit(): void {
    this.favoriteJokes.set(this.jokeService.getFavorites());
  }

  public removeFromFavorites(joke: IJoke) {
    this.favoriteJokes.set(this.jokeService.removeFromFavorites(joke));
  }
}
