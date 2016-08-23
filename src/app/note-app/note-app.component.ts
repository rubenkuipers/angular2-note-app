import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
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
	previewTitle:string;
	previewContent:string;
	md = new MarkdownIt();

	constructor(private noteService: NoteService, private fb: FormBuilder) {
		this.createForm();
	}

	createForm() {
		this.noteForm = this.fb.group({'title': '', 'content': ''});
		this.previewTitle = '';
		this.previewContent = '';
		this.subscribeChanges();
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

	subscribeChanges() {
		this.noteForm.controls['title'].valueChanges.subscribe(value => {
			this.previewTitle = value;
		});
		this.noteForm.controls['content'].valueChanges.subscribe(value => {
			this.previewContent = this.parseMarkdown(value);
		});
	}

	parseMarkdown(content) {
		return this.md.render(content);
	}

	ngOnInit() {
		this.subscribeChanges();
	}

	ngOnChange() {

	}

	onSubmit(value: any): void {
		console.log('you submitted value:', value);
		this.addNote(value);
		this.createForm();
	}

}
