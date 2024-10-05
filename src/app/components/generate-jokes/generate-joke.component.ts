import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';

import { isNil } from 'lodash-es';

import { JokeService } from '../../services/joke.service';
import { JokeComponent } from '../joke/joke.component';
import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-generate-joke',
  standalone: true,
  imports: [JokeComponent, NgIf],
  templateUrl: './generate-joke.component.html',
  styleUrl: './generate-joke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateJokesComponent {
  public joke = signal<IJoke | undefined>(undefined);

  public searchedJokes = signal<IJoke[]>([]);
  public jokeSearchForm: UntypedFormGroup | any;

  constructor(private jokeService: JokeService) {}

  public getJoke(): void {
    this.jokeService.getRandomJoke().subscribe((joke: IJoke) =>
      this.joke.set(joke)
    );
  }

  public saveToFavorites() {
    if (isNil(this.joke())) {
      return;
    }

    this.jokeService.saveToFavorites(this.joke() as IJoke);
    alert(
      'Since you like it so much you can read it in your favorites any time you like, sport!'
    );
  }
}
