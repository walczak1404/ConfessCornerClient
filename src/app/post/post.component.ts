import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DateFormatterService } from '../services/date-formatter.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  convertedDate: string;
  commentsAmount: number | string;
  commentsOpen = false;

  constructor(private httpClient: HttpClient, private dateFormatter: DateFormatterService) {}

  ngOnInit(): void {
    this.fetchCommentsAmount();
    this.convertedDate = this.dateFormatter.convertDate(this.post.CreatedOn);
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
