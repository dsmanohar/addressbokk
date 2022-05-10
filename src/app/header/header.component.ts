import { Component, EventEmitter, Output } from '@angular/core'

import { PeopleService } from '../people.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output('clickStatus') eventEmit = new EventEmitter<boolean>()

  clickStatus: boolean = false
  sendClickStatus() {
    this.peopleService.formClicked = true
  }
  constructor(private peopleService: PeopleService) {}
}
