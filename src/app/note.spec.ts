/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Note} from './note';

describe('Note', () => {

  it('should create an instance', () => {
    expect(new Note()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
  	let note = new Note({
	  title: 'First note',
	  content: 'This is my first note, how much fun is that!'
	});
  	expect(note.title).toEqual('First note');
  	expect(note.content).toEqual('This is my first note, how much fun is that!');
  });

});
