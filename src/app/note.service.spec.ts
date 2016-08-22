/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import {Note} from './note';
import {NoteService} from './note.service';

describe('Note Service', () => {

  beforeEachProviders(() => [NoteService]);

  describe('#getAllNotes()', () => {

    it('should return an empty array by default', inject([NoteService], (service: NoteService) => {
      expect(service.getAllNotes()).toEqual([]);
    }));

    it('should return all notes', inject([NoteService], (service: NoteService) => {
      let note1 = new Note({title: 'Hello 1', content: 'New note 1'});
      let note2 = new Note({title: 'Hello 2', content: 'New note 2'});
      service.addNote(note1);
      service.addNote(note2);
      expect(service.getAllNotes()).toEqual([note1, note2]);
    }));

  });

  describe('#save(note)', () => {

    it('should automatically assign an incrementing id', inject([NoteService], (service: NoteService) => {
      let note1 = new Note({title: 'Hello 1', content: 'New note 1'});
      let note2 = new Note({title: 'Hello 2', content: 'New note 2'});
      service.addNote(note1);
      service.addNote(note2);
      expect(service.getNoteById(1)).toEqual(note1);
      expect(service.getNoteById(2)).toEqual(note2);
    }));

  });

  describe('#deleteNoteById(id)', () => {

    it('should remove note with the corresponding id', inject([NoteService], (service: NoteService) => {
      let note1 = new Note({title: 'Hello 1', content: 'New note 1'});
      let note2 = new Note({title: 'Hello 2', content: 'New note 2'});
      service.addNote(note1);
      service.addNote(note2);
      expect(service.getAllNotes()).toEqual([note1, note2]);
      service.deleteNoteById(1);
      expect(service.getAllNotes()).toEqual([note2]);
      service.deleteNoteById(2);
      expect(service.getAllNotes()).toEqual([]);
    }));

    it('should not removing anything if note with corresponding id is not found', inject([NoteService], (service: NoteService) => {
      let note1 = new Note({title: 'Hello 1', content: 'New note 1'});
      let note2 = new Note({title: 'Hello 2', content: 'New note 2'});
      service.addNote(note1);
      service.addNote(note2);
      expect(service.getAllNotes()).toEqual([note1, note2]);
      service.deleteNoteById(3);
      expect(service.getAllNotes()).toEqual([note1, note2]);
    }));

  });

  describe('#updateNoteById(id, values)', () => {

    it('should return note with the corresponding id and updated data', inject([NoteService], (service: NoteService) => {
      let note = new Note({title: 'Hello 1', content: 'New note 1'});
      service.addNote(note);
      let updatedNote = service.updateNoteById(1, {
        title: 'new title'
      });
      expect(updatedNote.title).toEqual('new title');
    }));

    it('should return null if note is not found', inject([NoteService], (service: NoteService) => {
      let note = new Note({title: 'Hello 1', content: 'New note 1'});
      service.addNote(note);
      let updatedNote = service.updateNoteById(2, {
        title: 'new title'
      });
      expect(updatedNote).toEqual(null);
    }));

  });

});
