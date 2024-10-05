import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  FormBuilder,
} from '@angular/forms';
import { take } from 'rxjs';
import { JokeService } from '../../services/joke.service';
import { IJoke } from '../utils/jokes.types';
import { JokeComponent } from '../joke/joke.component';

@Component({
  selector: 'app-joke-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf, JokeComponent],
  templateUrl: './joke-search.component.html',
  styleUrl: './joke-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeSearchComponent implements OnInit {
  searchedJokes = signal<IJoke[]>([]);
  jokeSearchForm: UntypedFormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService
  ) {}

  ngOnInit(): void {
    this.jokeSearchForm = this.formBuilder.group({ searchTerm: [''] });
  }

  searchJokes(): void {
    this.jokeService
      .getJokesBySearch(this.jokeSearchForm?.value.searchTerm)
      .pipe(take(1))
      .subscribe((searchResponse) => {
        this.searchedJokes.set(searchResponse);
      });
  }
}
