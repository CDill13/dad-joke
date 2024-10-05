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
    if (this.jokeSearchForm?.value.searchTerm.length < 1) {
      alert("C'mon now, Champ, you gotta tell me what you want to chuckle at!");
      return;
    } else {
      this.jokeService
        .getJokesBySearch(this.jokeSearchForm?.value.searchTerm)
        .pipe(take(1))
        .subscribe((searchResponse) => {
          this.searchedJokes.set(searchResponse);
        });
    }
  }
  saveToFavorites(id: any, joke: any) {
    const newJoke: IJoke = { id, joke };
    this.jokeService.saveToFavorites(newJoke);
    alert(
      'Since you like it so much you can read it in your favorites any time you like, sport!'
    );
  }
}
