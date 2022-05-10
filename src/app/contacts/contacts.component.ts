import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { People } from '../../assets/types'
import { PeopleService } from '../people.service'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @ViewChild('container') container: ElementRef
  formDisplay: boolean = false
  people: People[]
  headerStatus: boolean = false
  firstChildStatus: boolean = false
  currPerson: People | null = null
  formPerson: People | null = null
  constructor(
    public peopleService: PeopleService,
    private renderer: Renderer2,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7164/api/Contacts').subscribe((data) => {
      let array = data as People[]
      this.peopleService.people = this.peopleService.people.concat(array)
      if (this.peopleService.people.length) {
        this.peopleService.indexClicked = 0
        this.peopleService.bgClicked[0] = true
        this.currPerson = this.peopleService.people[0]
      }
    })
  }

  clickEvent(eventobj: { index: number }) {
    if (this.peopleService.indexClicked === -1)
      this.peopleService.indexClicked = eventobj.index
    else this.peopleService.bgClicked[this.peopleService.indexClicked] = false
    this.peopleService.indexClicked = eventobj.index
    this.peopleService.bgClicked[this.peopleService.indexClicked] = true
    this.currPerson = this.peopleService.people.length
      ? this.peopleService.people[this.peopleService.indexClicked]
      : null
  }

  deletePerson() {
    let initialIndex = this.peopleService.indexClicked
    this.http
      .delete(
        'https://localhost:7164/api/Contacts/' +
          this.peopleService.people[
            this.peopleService.indexClicked
          ].id.toString(),
      )
      .subscribe(() => {
        if (
          this.peopleService.people.length === 1 &&
          this.peopleService.indexClicked === 0
        )
          this.peopleService.indexClicked = -1
        else if (
          this.peopleService.people.length >= 1 &&
          this.peopleService.indexClicked === 0
        )
          this.peopleService.indexClicked = 0
        else this.peopleService.indexClicked -= 1
        this.peopleService.people.splice(initialIndex, 1)
        this.peopleService.bgClicked.splice(initialIndex, 1)
        this.peopleService.indexClicked === -1
          ? (this.currPerson = null)
          : this.container.nativeElement.children[
              this.peopleService.indexClicked
            ].click()
      })
  }

  editPerson() {
    this.peopleService.formClicked = true
    this.formPerson = this.peopleService.people[this.peopleService.indexClicked]
  }

  formPersonToNull() {
    this.container.nativeElement.children[
      this.peopleService.indexClicked
    ].click()
    this.formPerson = null
  }
}
