import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
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
  public joke = input<IJoke>();

  constructor(private router: Router) {}

  @Input() jokeText!: string;
  @Input() jokeId!: string;

  goToJokePage() {
    this.router.navigate(['/joke-page', this.jokeId]);
  }
}
