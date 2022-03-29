import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'note-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private subscription: Subscription;
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
    this.subscription = this.noteService.noteListChangedEvent.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
      );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
