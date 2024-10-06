import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { JokeService } from '../../services/joke.service';
import { IJoke } from '../utils/jokes.types';
import { KneeSlapperComponent } from '../knee-slapper/knee-slapper.component';

@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [RouterLink, KneeSlapperComponent],
  templateUrl: './joke-page.component.html',
  styleUrl: './joke-page.component.scss',
})
export class JokePageComponent implements OnInit {
  public joke = signal<IJoke | undefined>(undefined);
  public backgroundColor = signal('white');

  constructor(
    private route: ActivatedRoute,
    private jokeService: JokeService
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const jokeId = params['jokeId'];
      this.backgroundColor.set(this.stringToColor(jokeId));
      this.getJokeById(jokeId);
    });
  }

  private stringToColor(jokeId: string): string {
    let hash = 0;

    for (let i = 0; i < jokeId.length; i++) {
      hash += jokeId.charCodeAt(i);
    }

    const r = hash % 256;
    const g = (hash * 2) % 256;
    const b = (hash * 3) % 256;

    return `rgb(${r},${g},${b})`;
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
