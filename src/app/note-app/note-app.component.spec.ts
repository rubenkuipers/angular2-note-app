/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { NoteAppComponent } from './note-app.component';
import { NoteService } from '../note.service';

beforeEachProviders(() => [NoteAppComponent, NoteService]);

describe('Component: NoteApp', () => {

  it('should create an instance', inject([NoteService], (noteService: NoteService) => {
    expect(noteService).toBeTruthy();
  }));

});