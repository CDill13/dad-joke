import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { take } from 'rxjs';

import { JokeService } from '../../services/joke.service';
import { KneeSlapperComponent } from '../knee-slapper/knee-slapper.component';
import { JokeStarComponent } from '../joke-star/joke-star.component';

import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [RouterLink, KneeSlapperComponent, JokeStarComponent],
  templateUrl: './joke-page.component.html',
  styleUrl: './joke-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokePageComponent implements OnInit {
  public joke = signal<IJoke | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private jokeService: JokeService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const jokeId = params['jokeId'];
      this.getJokeById(jokeId);
    });
  }

  private getJokeById(jokeId: string): void {
    this.jokeService
      .getJokeById(jokeId)
      .pipe(take(1))
      .subscribe((joke: IJoke) => {
        this.joke.set(joke);
      });
  }
}
