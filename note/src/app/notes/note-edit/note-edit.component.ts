import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'note-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  originalNote: Note;
  note: Note;
  editMode: boolean = false;

  
  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    
    this.route.params.subscribe (
      (params: Params) => {
        let id = +params['id'];
        if (id == undefined || id == null) {              
          this.editMode = false
          return
        }
        this.originalNote = this.noteService.getNote(id.toString())
      
        if (this.originalNote == undefined || this.originalNote == null) {              
          return
        }
        this.editMode = true
        this.note = JSON.parse(JSON.stringify(this.originalNote))
    });
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onSubmit(form: NgForm) {
    let value = form.value // get values from form’s fields
    let newNote = new Note(value['id'], value['name'], value['description'], value['date'], value['children'])
    if (this.editMode == true) {
      this.noteService.updateNote(this.originalNote, newNote)
    }
     
    else {
      console.log(newNote)
      this.noteService.addNote(newNote)
    }
    this.onCancel();
  }
}
