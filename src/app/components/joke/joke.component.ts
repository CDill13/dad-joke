import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joke',
  standalone: true,
  imports: [],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeComponent {
  constructor(private router: Router) {}

  @Input() jokeText!: string;
  @Input() jokeId!: string;

  goToJokePage() {
    this.router.navigate(['/joke-page', this.jokeId]);
  }
}
