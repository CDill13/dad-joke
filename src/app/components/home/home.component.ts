import { Component } from '@angular/core';
import { GenerateJokesComponent } from '../generate-jokes/generate-joke.component';
import { JokeSearchComponent } from '../joke-search/joke-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GenerateJokesComponent, JokeSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
