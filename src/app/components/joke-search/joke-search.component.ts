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
import { JokeComponent } from '../joke/joke.component';
import { IJoke } from '../utils/jokes.types';
import { KneeSlapperComponent } from '../knee-slapper/knee-slapper.component';

@Component({
  selector: 'app-joke-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JokeComponent, KneeSlapperComponent],
  templateUrl: './joke-search.component.html',
  styleUrl: './joke-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeSearchComponent implements OnInit {
  public searchedJokes = signal<IJoke[]>([]);
  public jokeSearchForm: UntypedFormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService
  ) {}

  public ngOnInit(): void {
    this.jokeSearchForm = this.formBuilder.group({ searchTerm: [''] });
  }

  public searchJokes(): void {
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

  public saveToFavorites(joke: IJoke) {
    this.jokeService.saveToFavorites(joke);
    alert(
      'Since you like it so much you can read it in your favorites any time you like, sport!'
    );
  }
}
