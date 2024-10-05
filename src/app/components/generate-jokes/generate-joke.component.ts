import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JokeService } from '../../services/joke.service';
import { UntypedFormGroup } from '@angular/forms';
import { signal } from '@angular/core';
import { IJoke } from '../utils/jokes.types';
import { JokeComponent } from '../joke/joke.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-generate-joke',
  standalone: true,
  imports: [JokeComponent, NgIf],
  templateUrl: './generate-joke.component.html',
  styleUrl: './generate-joke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateJokesComponent {
  jokeText = signal('');
  jokeId = signal('');

  searchedJokes = signal<IJoke[]>([]);
  jokeSearchForm: UntypedFormGroup | any;

  constructor(private jokeService: JokeService) {}

  getJoke(): void {
    console.log(this.jokeText());
    this.jokeService.getRandomJoke().subscribe((joke: IJoke) => {
      this.jokeText.set(joke.joke);
      this.jokeId.set(joke.id);
    });
  }

  saveToFavorites() {
    const newJoke: IJoke = { id: this.jokeId(), joke: this.jokeText() };
    this.jokeService.saveToFavorites(newJoke);
    alert(
      'Since you like it so much you can read it in your favorites any time you like, sport!'
    );
  }
}
