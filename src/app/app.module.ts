import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { ContactsComponent } from './contacts/contacts.component'
import { DisplayDetailsComponent } from './display-details/display-details.component'
import { FormComponent } from './form/form.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    DisplayDetailsComponent,
    FormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
