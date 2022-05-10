import { Component, Input, Output, EventEmitter } from '@angular/core'

import { People } from 'src/assets/types'

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.scss'],
})
export class DisplayDetailsComponent {
  @Input('people') people: People | null = null
  @Output('deletePerson') delete = new EventEmitter<void>()
  @Output('editPer') edit = new EventEmitter<void>()
}
