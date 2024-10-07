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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { JokeService } from '../../services/joke.service';
import { ToasterService } from '../../services/toaster.service';

import { JokeComponent } from '../joke/joke.component';
import { KneeSlapperComponent } from '../knee-slapper/knee-slapper.component';

import { IJoke } from '../utils/jokes.types';

@Component({
  selector: 'app-joke-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JokeComponent,
    KneeSlapperComponent,
    FontAwesomeModule,
  ],
  templateUrl: './joke-search.component.html',
  styleUrl: './joke-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokeSearchComponent implements OnInit {
  public searchedJokes = signal<IJoke[]>([]);
  public jokeSearchForm: UntypedFormGroup | any;
  public faMagnifyingGlass = signal(faMagnifyingGlass);

  constructor(
    private formBuilder: FormBuilder,
    private jokeService: JokeService,
    private toaster: ToasterService
  ) {}

  public ngOnInit(): void {
    this.jokeSearchForm = this.formBuilder.group({ searchTerm: [''] });
  }

  public searchJokes(): void {
    if (this.jokeSearchForm?.value.searchTerm.length < 1) {
      this.toaster.warning(
        "C'mon now, Champ, you gotta tell me what you want to chuckle at!",
        'Uh oh!'
      );

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
}
