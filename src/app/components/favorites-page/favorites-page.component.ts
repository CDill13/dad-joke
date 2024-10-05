import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { JokeService } from '../../services/joke.service';
import { IJoke } from '../utils/jokes.types';
import { JokeComponent } from '../joke/joke.component';
import { NgForOf } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [JokeComponent, NgForOf],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent implements OnInit {
  favoriteJokes = signal<IJoke[]>([]);

  constructor(private jokeService: JokeService) {}
  ngOnInit(): void {
    this.favoriteJokes.set(this.jokeService.getFavorites());
  }
  removeFromFavorites(id: IJoke['id']) {
    this.jokeService.removeFromFavorites(id);
    this.favoriteJokes.set(this.jokeService.getFavorites());
  }
}
