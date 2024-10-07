import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { isNil } from 'lodash';

import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-joke-star',
  standalone: true,
  templateUrl: './joke-star.component.html',
  styleUrl: './joke-star.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokeStarComponent {
  public joke = input<IJoke | undefined>(undefined);
  public starColor = computed(() => {
    if (isNil(this.joke())) {
      return 'white';
    }

    return this.stringToColor(this.joke()?.id as string);
  });

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
}
