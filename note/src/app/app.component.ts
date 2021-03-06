import { Component } from '@angular/core';

@Component({
  selector: 'note-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFeature = 'notes';
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
  title = 'note';
}
