import { Component, OnInit } from '@angular/core';
import { JokeService } from '../../services/joke.service';
import {
  FormsModule,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { signal } from '@angular/core';
import { NgForOf } from '@angular/common';
import { IJoke } from '../utils/jokes.types';
import { take } from 'rxjs';

@Component({
  selector: 'app-generate-jokes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf],
  templateUrl: './generate-jokes.component.html',
  styleUrl: './generate-jokes.component.css',
})
export class GenerateJokesComponent implements OnInit {
  randomJoke = '';
  searchedJokes = signal<IJoke[]>([]);
  jokeSearchForm: UntypedFormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.jokeSearchForm = this.formBuilder.group({ searchTerm: [''] });
  }

  getJoke(): void {
    console.log('button');
    this.jokeService.getRandomJoke().subscribe((joke: IJoke) => {
      this.randomJoke = joke.joke;
    });
  }

  searchJokes(): void {
    console.log('this.searchedJokes', this.searchedJokes);

    this.jokeService
      .getJokesBySearch(this.jokeSearchForm?.value.searchTerm)
      .pipe(take(1))
      .subscribe((searchResponse) => {
        this.searchedJokes.set(searchResponse);
        console.log('this.searchedJokes', this.searchedJokes);
        console.log('searchResponse', searchResponse);
      });
  }
}
