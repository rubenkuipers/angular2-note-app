import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
	selector: 'note-app',
	templateUrl: 'note-app.component.html',
	styleUrls: ['note-app.component.scss'],
	providers: [ NoteService ],
	// directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class NoteAppComponent implements OnInit {

	newNote: Note = new Note();
	notes = [];
	noteForm: FormGroup;
	editNoteForm: FormGroup;
	previewTitle:string;
	previewContent:string;
	showOverlay = false;
	showDeleteModal = false;
	noteToDelete = {};
	noteToEdit = {editing:false};
	md = new MarkdownIt();

	constructor(private noteService: NoteService, private fb: FormBuilder, private elementRef: ElementRef) {
		this.createForm();
	}

	createForm() {
		this.noteForm = this.fb.group({'title': '', 'content': ''});
		this.previewTitle = '';
		this.previewContent = '';
		this.subscribeChanges();
	}

	getNotes() {
		this.notes = this.noteService.getAllNotes();
	}

	addNote(note) {
		this.newNote = note;
		this.noteService.addNote(this.newNote);
		this.newNote = new Note();
	}

	editNote(note) {
		this.editNoteForm = this.fb.group({'title': note.title, 'content': note.content});
		this.showOverlay = true;
		note.editing = true;
		this.noteToEdit = note;
		// Set focus to current note form textarea
		setTimeout(() => {  
		  this.elementRef.nativeElement.querySelector('.item__form textarea').focus();
		}, 0);
		
	}

	removeNote(note) {
		this.noteService.deleteNoteById(note.id);
		this.closeDeleteModal();
		this.noteToDelete = {};
		this.getNotes();
	}

	subscribeChanges() {
		this.noteForm.controls['title'].valueChanges.subscribe(value => {
			this.previewTitle = value;
		});
		this.noteForm.controls['content'].valueChanges.subscribe(value => {
			this.previewContent = this.parseMarkdown(value);
		});
	}

	openDeleteModal(note) {
		this.showOverlay = true;
		this.showDeleteModal = true;
		this.noteToDelete = note;
	}

	closeDeleteModal() {
		this.showOverlay = false;
		this.showDeleteModal = false;
	}

	parseMarkdown(content) {
		return this.md.render(content);
	}

	ngOnInit() {
		this.getNotes();
		this.subscribeChanges();
	}

	onSubmit(value: any): void {
		this.addNote(value);
		this.createForm();
	}

	onEditSubmit(note: any, value: any): void {
		note.editing = false;
		delete note.editing;
		this.noteService.updateNoteById(note.id, value);
		this.showOverlay = false;
	}

	abortOverlay() {
		this.closeDeleteModal();
		this.noteToEdit.editing = false;
	}

}
