import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JokePageComponent } from './components/joke-page/joke-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { JokeSearchComponent } from './components/joke-search/joke-search.component';

export const routes: Routes = [
  { path: 'joke-page/:jokeId', component: JokePageComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'search', component: JokeSearchComponent },
  { path: '**', redirectTo: '/home' }
];
