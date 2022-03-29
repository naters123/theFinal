import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'note-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note;
  id: string
  nativeWindow: any;

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router, private windowRefService: WindRefService) { 
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  onView() {
    if (this.note.date) {
      this.nativeWindow.open(this.note.date);
    }
  }
  onDelete() {
    this.noteService.deleteNote(this.note);
    // route back to the '/notes' URL
    this.router.navigate(['/notes'])
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.note = this.noteService.getNote(this.id)
      }
    );
  }

}
