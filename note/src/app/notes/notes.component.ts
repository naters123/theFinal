import { Component, OnInit } from '@angular/core';
import { Note } from './note.model';
import { NoteService } from './note.service';

@Component({
  selector: 'note-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  selectedNote: Note;
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.noteSelectedEvent.subscribe(
      (note: Note) => {
        this.selectedNote = note;
      }
      );
  }

}
