import { Component, OnInit, signal } from '@angular/core';
import { JokeService } from '../../services/joke.service';
import { ActivatedRoute } from '@angular/router';
import { IJoke } from '../utils/jokes.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './joke-page.component.html',
  styleUrl: './joke-page.component.scss',
})
export class JokePageComponent implements OnInit {
  jokeId!: string;
  jokeText = signal('');
  backgroundColor!: string;

  constructor(
    private route: ActivatedRoute,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jokeId = params['jokeId'];
      this.backgroundColor = this.stringToColor(this.jokeId);
    });
    this.getJokeById();
  }

  stringToColor(jokeId: string): string {
    let hash = 0;

    for (let i = 0; i < jokeId.length; i++) {
      hash += jokeId.charCodeAt(i);
    }

    const r = hash % 256;
    const g = (hash * 2) % 256;
    const b = (hash * 3) % 256;

    return `rgb(${r},${g},${b})`;
  }

  getJokeById(): void {
    this.jokeService.getJokeById(this.jokeId).subscribe((joke: IJoke) => {
      this.jokeText.set(joke.joke);
    });
  }

  saveToFavorites() {
    const newJoke: IJoke = { id: this.jokeId, joke: this.jokeText() };
    this.jokeService.saveToFavorites(newJoke);
    alert(
      'Since you like it so much you can read it in your favorites any time you like, sport!'
    );
  }
}
