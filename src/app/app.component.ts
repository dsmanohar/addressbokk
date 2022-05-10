import { Component, OnInit } from '@angular/core'

import { PeopleService } from './people.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PeopleService],
})
export class AppComponent implements OnInit {
  constructor(private peopleService: PeopleService) {}
  ngOnInit(): void {}
}
