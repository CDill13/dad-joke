import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

import { isNil } from 'lodash';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JokeService } from '../../services/joke.service';
import { JokeComponent } from '../joke/joke.component';
import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-knee-slapper',
  standalone: true,
  imports: [JokeComponent, FontAwesomeModule],
  templateUrl: './knee-slapper.component.html',
  styleUrl: './knee-slapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KneeSlapperComponent {
  public joke = input<IJoke | undefined>(undefined);
  public faHeart = signal(faHeart);

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
