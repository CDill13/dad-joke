import { Component, OnInit } from '@angular/core';
import { JokeService } from '../../services/joke.service';
import {
  FormsModule,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-generate-jokes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './generate-jokes.component.html',
  styleUrl: './generate-jokes.component.css',
})
export class GenerateJokesComponent implements OnInit {
  randomJoke = '';
  jokeSearchForm: UntypedFormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.jokeSearchForm = this.formBuilder.group({ searchTerm: [''] });
    console.log(this.jokeSearchForm);
  }

  getJoke(): void {
    console.log('button');
    this.jokeService.getRandomJoke().subscribe((joke) => {
      console.log(joke);
      this.randomJoke = joke.joke;
    });
  }

  searchJoke(): void {
    console.log(this.jokeSearchForm?.value);
    this.jokeService.getJokeBySearch(this.jokeSearchForm?.value.searchTerm).subscribe(searchedJoke => console.log(searchedJoke));
  }
}
