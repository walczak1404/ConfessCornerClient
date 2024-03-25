import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ConfessCornerClient';
  isAdding = false;
  isLoading = true;

  onChangeAddingState(): void {
    console.log("test");

    this.isAdding = !this.isAdding;
  }
}
