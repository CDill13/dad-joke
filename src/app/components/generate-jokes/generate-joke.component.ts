import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { JokeService } from '../../services/joke.service';
import { JokeComponent } from '../joke/joke.component';
import { KneeSlapperComponent } from '../knee-slapper/knee-slapper.component';
import { IJoke } from '../utils/jokes.types';

import * as toastr from 'toastr';

@Component({
  selector: 'app-generate-joke',
  standalone: true,
  imports: [JokeComponent, KneeSlapperComponent],
  templateUrl: './generate-joke.component.html',
  styleUrl: './generate-joke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateJokesComponent implements OnInit {
  public joke = signal<IJoke | undefined>(undefined);

  public searchedJokes = signal<IJoke[]>([]);
  public jokeSearchForm: UntypedFormGroup | any;

  constructor(private jokeService: JokeService) {}

  public ngOnInit(): void {
    this.getJoke(true);
  }

  public getJoke(init?: boolean): void {
    if (!init) {
      const pullMyFingerJoke = this.jokeService.getPullMyFingerJoke();
      toastr.warning(pullMyFingerJoke.punchline, pullMyFingerJoke.question, {
        timeOut: 6000
      });
    }

    this.jokeService
      .getRandomJoke()
      .pipe(take(1))
      .subscribe((joke: IJoke) => this.joke.set(joke));
  }
}
