import { Component } from '@angular/core';
import { GenerateJokesComponent } from "../generate-jokes/generate-jokes.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ GenerateJokesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
