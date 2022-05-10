import { Injectable } from '@angular/core'

import { People } from 'src/assets/types'
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  people: People[] = []
  bgClicked: boolean[] = []
  indexClicked: number = -1
  formClicked: boolean = false
}
