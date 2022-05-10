import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { People } from 'src/assets/types'
import { PeopleService } from '../people.service'

class validation {
  emailValidate(param: string) {
    let regExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+[.][a-zA-Z]+[.a-zA-Z]*$/
    return regExp.test(param) ? true : false
  }
  urlValidate(param: string) {
    let regExp = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
    return regExp.test(param) ? true : false
  }

  countValidate(param: string) {
    return param.length > 0
  }

  landLineValidate(param: string) {
    let regExp = /^[0-9]\d{2,4}-\d{6,8}$/
    return regExp.test(param) ? true : false
  }
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input('formContent') formContent: People | null
  @Output('saveStatus') saveStatus = new EventEmitter<void>()
  nameErr: boolean = false
  emailErrReq: boolean = false
  emailErr: boolean = false
  landlineErrReq: boolean = false
  landlineErr: boolean = false
  webErrReq: boolean = false
  webErr: boolean = false
  name: string = ''
  email: string = ''
  mobile: string = ''
  landline: string = ''
  website: string = ''
  address: string = ''
  validateObj
  constructor(
    private peopleService: PeopleService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private http: HttpClient,
  ) {
    this.validateObj = new validation()
  }

  setElements(obj: People) {
    this.name = obj.name
    this.email = obj.email
    this.mobile = obj.mobile
    this.landline = obj.landline
    this.website = obj.website
    this.address = obj.address
  }
  validate(person: People) {
    let returnVal = true
    if (!this.validateObj.countValidate(person.name)) {
      this.nameErr = true
      returnVal = false
    } else {
      this.nameErr = false
    }

    if (!this.validateObj.countValidate(person.email)) {
      this.emailErrReq = true
      returnVal = false
    } else if (!this.validateObj.emailValidate(person.email)) {
      this.emailErrReq = false
      this.emailErr = true
      returnVal = false
    } else {
      this.emailErr = false
      this.emailErrReq = false
    }

    if (!this.validateObj.countValidate(person.landline)) {
      this.landlineErrReq = true
      returnVal = false
    } else if (!this.validateObj.landLineValidate(person.landline)) {
      this.landlineErrReq = false
      this.landlineErr = true
      returnVal = false
    } else {
      this.landlineErrReq = false
      this.landlineErr = false
    }

    if (!this.validateObj.countValidate(person.website)) {
      this.webErrReq = true
      returnVal = false
    } else if (!this.validateObj.urlValidate(person.website)) {
      this.webErrReq = false
      this.webErr = true
      returnVal = false
    } else {
      this.webErr = false
      this.webErrReq = false
    }

    return returnVal
  }
  addPerson() {
    let person: People = {
      email: this.email,
      name: this.name,
      website: this.website,
      address: this.address,
      mobile: this.mobile,
      landline: this.landline,
      id: -1,
    }
    let data = {
      email: this.email,
      name: this.name,
      website: this.website,
      address: this.address,
      mobile: this.mobile.toString(),
      landline: this.landline.toString(),
    }
    if (!this.validate(person)) return
    this.http
      .post('https://localhost:7164/api/Contacts', data)
      .subscribe((responseData) => {
        person = responseData as People
        this.peopleService.people.push(person)
        this.peopleService.formClicked = false
        this.peopleService.bgClicked.push(false)
        this.saveStatus.emit()
      })
  }
  close() {
    this.setElements({
      name: '',
      email: '',
      mobile: '',
      landline: '',
      website: '',
      address: '',
      id: -1,
    })
    this.peopleService.formClicked = false
    this.saveStatus.emit()
  }
  savePerson() {
    let person: People = {
      name: this.name,
      email: this.email,
      mobile: this.mobile.toString(),
      landline: this.landline.toString(),
      address: this.address,
      website: this.website,
      id: this.peopleService.people[this.peopleService.indexClicked].id,
    }
    if (!this.validate(person)) return
    this.http
      .put(
        'https://localhost:7164/api/Contacts/' +
          this.peopleService.people[
            this.peopleService.indexClicked
          ].id.toString(),
        person,
      )
      .subscribe((responseData) => {
        this.peopleService.people[this.peopleService.indexClicked] = person
        this.setElements({
          name: '',
          email: '',
          mobile: '',
          landline: '',
          website: '',
          address: '',
          id: -1,
        })
        this.peopleService.formClicked = false
        this.saveStatus.emit()
      })
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.formContent !== null) {
      this.setElements(this.formContent)
    }
    this.cd.detectChanges()
  }
}
