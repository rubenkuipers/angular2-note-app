import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import {Note} from '../note';
import {NoteService} from '../note.service';

@Component({
	moduleId: module.id,
	selector: 'note-app',
	templateUrl: 'note-app.component.html',
	styleUrls: ['note-app.component.css'],
	providers: [NoteService],
	directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class NoteAppComponent implements OnInit {

	newNote: Note = new Note();
	noteForm: FormGroup;
	private md: MarkedStatic;

	constructor(private noteService: NoteService, private fb: FormBuilder) {
		this.createForm();
		this.md = marked.setOptions({});
	}

	createForm() {
		this.noteForm = this.fb.group({'title': '', 'content': ''})
	}

	addNote(note) {
		this.newNote = note;
		this.noteService.addNote(this.newNote);
		this.newNote = new Note();
	}

	removeNote(note) {
		this.noteService.deleteNoteById(note.id);
	}

	get notes() {
		return this.noteService.getAllNotes();
	}

	ngOnInit() {
		
	}

	onSubmit(value: any): void {
		console.log('you submitted value:', value);
		this.addNote(value);
		this.createForm();
	}

}
