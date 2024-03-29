import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Nikos'; //Data binding me to html arxeio

  person0 =  {
    givenName: 'Nikos',
    surName: 'Ioannou',
    age: 25,
    email: 'nikosioannoy@aueb.gr',
    address: 'Preveza, Greece'
  }
  
  person1 =  {
    givenName: 'Bruh',
    surName: 'Bruhson',
    age: 25,
    email: 'bruhsonbruh@aueb.gr',
    address: 'Preveza, Greece'
  }
  
}
