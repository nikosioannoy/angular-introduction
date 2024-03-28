import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Nikos'; //Data binding me to html arxeio

  person = {
    givenName: 'Nikos',
    surName: 'Ioannou',
    age: 25,
    email: 'nikosioannoy@aueb.gr'
  }
}
