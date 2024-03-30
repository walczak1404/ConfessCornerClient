import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DateFormatterService } from '../services/date-formatter.service';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: Post;
  convertedDate: string;
  commentsAmount: number | string;
  commentsOpen = false;
  addCommentEvent: Subscription;

  constructor(private httpClient: HttpClient, private dateFormatter: DateFormatterService, private eventService: EventService) {}

  ngOnInit() {
    this.fetchCommentsAmount();
    this.convertedDate = this.dateFormatter.convertDate(this.post.CreatedOn);
    this.addCommentEvent = this.eventService.commentsAddingFinished.subscribe({
      next: (response: boolean) => { 
        if(response) {
          this.commentsAmount = +this.commentsAmount + 1;
        }
      }
    })
  }

  ngOnDestroy() {
    this.addCommentEvent.unsubscribe();
  }

  private fetchCommentsAmount() {
    this.httpClient.get(`${environment.apiURL}/Comments/Amount/${this.post.ConfessionId}`).subscribe({
      next: amount => {
        console.log(amount);
        this.commentsAmount = +amount;
      },

      error: error => {
        console.log(error);
        this.commentsAmount = "ERROR";
      }
    });
  }

  openComments() {
    this.commentsOpen = !this.commentsOpen;
  }
}
