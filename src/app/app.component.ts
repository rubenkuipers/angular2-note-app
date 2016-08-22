import { Component } from '@angular/core';
import { NoteAppComponent} from './note-app';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [NoteAppComponent]
})
export class AppComponent {

}
