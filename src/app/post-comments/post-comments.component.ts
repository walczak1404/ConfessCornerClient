import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { DateFormatterService } from '../services/date-formatter.service';
import { EventService } from '../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css'
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  addingComment = false;
  @Input() postId!:string;
  commentsList: {author?: string, content: string, formattedDate: string}[] = [];
  errorMsg: string;
  isLoading = true;
  addCommentEvent: Subscription;

  constructor(private http: HttpClient, private dateFormatter: DateFormatterService, private eventService: EventService) {}

  ngOnInit() {
      this.fetchComments();
      this.addCommentEvent = this.eventService.commentsAddingFinished.subscribe({
        next: (response: boolean) => {this.changeAddingCommentState(response)}
      })
  }

  ngOnDestroy() {
    this.addCommentEvent.unsubscribe();
  }

  changeAddingCommentState(isAdded: boolean) {
    if(isAdded) {
      this.fetchComments();
    }

    this.addingComment = !this.addingComment;
  }

  private fetchComments() {
    this.commentsList = [];
    this.http.get(`${environment.apiURL}/Comments/${this.postId}`)
      .subscribe({
        next: (response: {author: string, content: string, createdOn: string}[]) => {
          for(const item of response) {
            this.commentsList.push({author: item.author, content: item.content, formattedDate: this.dateFormatter.convertDate(item.createdOn)});
          }
          this.isLoading = false;
        },

        error: error => {
          console.log(error);
          switch(error.status) {
            case 0:
            case 500:
              this.errorMsg = "Server connection failed";
              break;
            default:
              this.errorMsg = error.error.detail;
          }

          this.isLoading = false;
        }
      });
  }
}
