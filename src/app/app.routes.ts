import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';

export const routes: Routes = [{
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
},
{path: 'dashboard', component: DashboardComponent}];
