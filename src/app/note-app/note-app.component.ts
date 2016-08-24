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
	editNoteForm: FormGroup;
	previewTitle:string;
	previewContent:string;
	showOverlay = false;
	showDeleteModal = false;
	noteToDelete = {};
	noteToEdit = {editing:false};
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
		this.closeDeleteModal();
		this.noteToDelete = {};
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

	editNote(note) {
		this.editNoteForm = this.fb.group({'title': note.title, 'content': note.content});
		this.showOverlay = true;
		note.editing = true;
		this.noteToEdit = note;
	}

	abortOverlay() {
		this.closeDeleteModal();
		this.noteToEdit.editing = false;
	}

	closeDeleteModal() {
		this.showOverlay = false;
		this.showDeleteModal = false;
	}

	openDeleteModal(note) {
		this.showOverlay = true;
		this.showDeleteModal = true;
		this.noteToDelete = note;
	}

	parseMarkdown(content) {
		return this.md.render(content);
	}

	ngOnInit() {
		this.subscribeChanges();
	}

	onSubmit(value: any): void {
		this.addNote(value);
		this.createForm();
	}

	onEditSubmit(note: any, value: any): void {
		this.noteService.updateNoteById(note.id, value);
		note.editing = false;
		this.showOverlay = false;
	}

}
