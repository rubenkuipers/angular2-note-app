import {Injectable} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {Note} from './note';

@Injectable()
export class NoteService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for notes
  notes: Note[] | any;

  constructor(private localStorageService: LocalStorageService) {
    if(!this.localStorageService.get('notes')) {
      this.localStorageService.set('notes',this.notes);
    }
  }

  // Simulate POST /notes
  addNote(note: Note): NoteService {
    if(this.notes.length) {
      this.lastId = this.notes[this.notes.length - 1].id;
    }
    if (!note.id) {
      note.id = ++this.lastId;
    }
    this.notes.push(note);
    this.localStorageService.set('notes', this.notes);
    return this;
  }

  // Simulate DELETE /notes/:id
  deleteNoteById(id: number): NoteService {
    this.notes = this.notes
      .filter(note => note.id !== id);
    this.localStorageService.set('notes', this.notes);
    return this;
  }

  // Simulate PUT /notes/:id
  updateNoteById(id: number, values: Object = {}): Note {
    let note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    Object.assign(note, values);
    this.localStorageService.set('notes', this.notes);
    return note;
  }

  // Simulate GET /notes
  getAllNotes(): Note[] {
    let notes = this.localStorageService.get('notes');
    console.log('get notes fired');
    if(notes) {
      this.notes = notes;
    } else {
      this.notes = [];
    }
    return this.notes;
  }

  // Simulate GET /notes/:id
  getNoteById(id: number): Note {
    return this.notes
      .filter(note => note.id === id)
      .pop();
  }

}
