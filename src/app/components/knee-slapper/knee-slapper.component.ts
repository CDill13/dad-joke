import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

import { JokeService } from '../../services/joke.service';
import { JokeComponent } from '../joke/joke.component';
import { IJoke } from '../utils/jokes.types';
import { isNil } from 'lodash';

@Component({
  selector: 'app-knee-slapper',
  standalone: true,
  imports: [JokeComponent],
  templateUrl: './knee-slapper.component.html',
  styleUrl: './knee-slapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KneeSlapperComponent {
  public joke = input<IJoke | undefined>(undefined)

  constructor(private jokeService: JokeService) {}

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
