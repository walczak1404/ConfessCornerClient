import { Component } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrl: './backdrop.component.css'
})
export class BackdropComponent {
  constructor(private eventService: EventService) { }

  onClosePopup() {
    this.eventService.popupClosed.next(true);
  }
}
