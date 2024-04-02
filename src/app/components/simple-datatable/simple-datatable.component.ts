import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EPerson } from 'src/app/shared/interfaces/person';
import { sortBy } from 'lodash-es';


@Component({
  selector: 'app-simple-datatable',
  standalone: true,
  imports: [],
  templateUrl: './simple-datatable.component.html',
  styleUrl: './simple-datatable.component.css'
})
export class SimpleDatatableComponent {
  @Input() data: EPerson[] //data(onoma metavlitis) tha lavei dedomena EPerson[]
  @Output() personClicked = new EventEmitter<EPerson>() //Event kouvalaei data EPerson

  sortOrder = {
    givenName: 'none',
    surName: 'none',
    age: 'none',
    email: 'none',
    education: 'none'
  }

  sortData(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      this.sortOrder[sortKey] = 'desc'
      this.data = sortBy(this.data, sortKey).reverse() //data=pinakas, sortKey = pedio me to opoio epileksame na ginei sort, reverse= fora taksinomishs
    } else {
      this.sortOrder[sortKey] = 'asc'
      this.data = sortBy(this.data, sortKey)
    }
    for(let key in this.sortOrder) {
      if(key != sortKey) {
        this.sortOrder[key] = 'none'
        //ΑΝ ΔΕΝ ΕΧΩ ΠΑΤΗΣΕΙ ΑΥΤΟ ΤΟ KEY ΤΟ ΚΑΝΩ ΝΟΝΕ
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    }
  }

  onPersonClicked(person: EPerson) {
    this.personClicked.emit(person)
  }
}

