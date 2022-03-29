import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject, } from "rxjs";
import { Note } from "./note.model";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  noteSelectedEvent = new EventEmitter<Note>();
  noteListChangedEvent = new Subject<Note[]>();
  notes: Note[] = [];
  maxNoteId: number = 0;

  constructor(private http: HttpClient) {
    this.getDatabaseData();
  }
  
  storeNotes() {
    const docs = JSON.stringify(this.notes);
    this.http
      .put(
        'http://localhost:3000/notes',
        docs
      )
      .subscribe(response => {
        console.log(response);
        this.noteListChangedEvent.next(this.notes.slice());
      });
  }

  getDatabaseData() {
    this.http
      .get<Note[]>(
        "http://localhost:3000/notes"
      )
      .subscribe({
        // complete: () => {  },
        error: (error: any) => {
          console.log(error);
        },
        next: (notes: any) => {
          this.notes = notes.notes;
          // console.log(this.notes)
          this.maxNoteId = this.getMaxId();
          this.notes = this.notes.sort(
            (current: Note, next: Note) => {
              if (current.name < next.name) {
                return -1;
              } else if (current.name > next.name) {
                return 1;
              } else if (current.name == next.name) {
                return 0;
              }
            }
          );
          this.noteListChangedEvent.next(this.notes.slice());
        },
      });
  }

  getNote(id: string) {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        return this.notes[i];
      }
    }
    return null;
  }
  getNotes() {
    return this.notes.slice();
  }


  deleteNote(note: Note) {

    if (!note) {
      return;
    }

    const pos = this.notes.findIndex(d => d.id === note.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/notes/' + note.id)
      .subscribe(
        (response: Response) => {
          this.notes.splice(pos, 1);
          this.storeNotes();
        }
      );
  }

  getMaxId(): number {
    let maxId: number = 0;

    for (let i: number = 0; i < this.notes.length; i++) {
      let currentId: number = parseInt(this.notes[i].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }


  addNote(note: Note) {
    if (!note) {
      return;
    }

    // make sure id of the new Note is empty
    note.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, note: Note }>('http://localhost:3000/notes',
      note,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new note to notes
          this.notes.push(responseData.note);
          this.storeNotes();
        }
      );
  }


  updateNote(originalNote: Note, newNote: Note) {
    if (!originalNote || !newNote) {
      return;
    }

    const pos = this.notes.findIndex(d => d.id === originalNote.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Note to the id of the old Note
    newNote.id = originalNote.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/notes/' + originalNote.id,
      newNote, { headers})
      .subscribe(
        (response: Response) => {
          this.notes[pos] = newNote;
        }
      );
  }
}
