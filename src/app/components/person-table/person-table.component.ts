import { Component } from '@angular/core';

@Component({
  selector: 'app-person-table',
  standalone: true,
  imports: [],
  templateUrl: './person-table.component.html',
  styleUrl: './person-table.component.css'
})
export class PersonTableComponent {
  person = {
    givenName: 'Nikos',
    surName: 'Ioannou',
    age: 25,
    email: 'nikosioannoy@aueb.gr'
  }
}
