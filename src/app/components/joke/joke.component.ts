import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Router } from '@angular/router';

import { isNil } from 'lodash-es';

import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-joke',
  standalone: true,
  imports: [],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeComponent {
  public joke = input<IJoke | undefined>(undefined);

  constructor(private router: Router) {}

  public goToJokePage() {
    if (isNil(this.joke())) {
      return;
    }

    this.router.navigate(['/joke-page', this.joke()?.id]);
  }
}
