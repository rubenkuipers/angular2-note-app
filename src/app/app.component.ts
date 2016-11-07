import { Component } from '@angular/core';
import { NoteAppComponent } from './note-app';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['../assets/css/main.scss'],
  encapsulation: ViewEncapsulation.None
  // directives: [NoteAppComponent]
})
export class AppComponent {

}
