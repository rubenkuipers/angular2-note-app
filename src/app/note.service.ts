import {Injectable} from '@angular/core';
import {Note} from './note';

@Injectable()
export class NoteService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for notes
  notes: Note[] = [];

  constructor() {
  }

  // Simulate POST /notes
  addNote(note: Note): NoteService {
    if (!note.id) {
      note.id = ++this.lastId;
    }
    this.notes.push(note);
    return this;
  }

  // Simulate DELETE /notes/:id
  deleteNoteById(id: number): NoteService {
    this.notes = this.notes
      .filter(note => note.id !== id);
    return this;
  }

  // Simulate PUT /notes/:id
  updateNoteById(id: number, values: Object = {}): Note {
    let note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    Object.assign(note, values);
    return note;
  }

  // Simulate GET /notes
  getAllNotes(): Note[] {
    return this.notes;
  }

  // Simulate GET /notes/:id
  getNoteById(id: number): Note {
    return this.notes
      .filter(note => note.id === id)
      .pop();
  }

}
