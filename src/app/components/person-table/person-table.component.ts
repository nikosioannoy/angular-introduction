import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  person: Person = {
    givenName: 'Nikos',
    surName: 'Ioannou',
    age: 25,
    email: 'nikosioannoy@aueb.gr',
    address: 'Preveza, Greece'
  }
}
