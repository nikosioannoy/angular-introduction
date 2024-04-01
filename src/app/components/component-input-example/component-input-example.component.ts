import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonTableComponent } from '../person-table/person-table.component';

@Component({
  selector: 'app-component-input-example',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './component-input-example.component.html',
  styleUrl: './component-input-example.component.css'
})
export class ComponentInputExampleComponent {
  person0: Person = {
    givenName: 'Nikos',
    surName: 'Ioannou',
    age: 25,
    email: 'nikosioannoy@aueb.gr',
    address: 'Preveza, Greece'
  }
  
  person1: Person =  {
    givenName: 'Bruh',
    surName: 'Bruhson',
    age: 25,
    email: 'bruhsonbruh@aueb.gr',
    address: 'Preveza, Greece'
  }
}
