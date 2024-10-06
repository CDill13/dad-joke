import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { isNil } from 'lodash-es';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JokeService } from '../../services/joke.service';
import { ToasterService } from '../../services/toaster.service';

import { JokeComponent } from '../joke/joke.component';

import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-knee-slapper',
  standalone: true,
  imports: [JokeComponent, FontAwesomeModule, CommonModule],
  templateUrl: './knee-slapper.component.html',
  styleUrl: './knee-slapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KneeSlapperComponent implements OnInit {
  public joke = input<IJoke | undefined>(undefined);
  public isLarge = input(false);
  public isFavorite = signal(false);
  public faHeart = signal(faHeart);

  constructor(private jokeService: JokeService, private toaster: ToasterService) {}

  public ngOnInit(): void {
    this.isFavorite.set(
      this.jokeService
        .getFavorites()
        .some((savedJoke: IJoke) => savedJoke.id === this.joke()?.id)
    );
  }

  public saveToFavorites(): void {
    if (isNil(this.joke()) || this.isFavorite()) {
      return;
    }

    this.jokeService.saveToFavorites(this.joke() as IJoke);
    this.isFavorite.set(true);
    this.toaster.success(
      'Since you like it so much you can read it in your favorites any time you like, sport!',
      'Huzzah!'
    );
  }
}
