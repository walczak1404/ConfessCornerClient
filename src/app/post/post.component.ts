import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  convertedDate: string;
  commentsAmount: number | string;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchCommentsAmount();
    this.convertDate();
  }

  private fetchCommentsAmount() {
    this.httpClient.get(`${environment.apiURL}/comments/amount/${this.post.ConfessionId}`).subscribe({
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

  private convertDate() {
    const dateNow = new Date();
    const dateAsDate = new Date(this.post.CreatedOn);
    const differenceInMilliseconds = Math.abs(dateNow.getTime() - dateAsDate.getTime());

    const seconds = differenceInMilliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = Math.floor((dateNow.getFullYear() - dateAsDate.getFullYear()) * 12 + (dateNow.getMonth() - dateAsDate.getMonth()));
    const years = dateNow.getFullYear() - dateAsDate.getFullYear();

    let number: number;
    let type: string;

    if (seconds < 60) {
        number = Math.floor(seconds);
        type = ' seconds';
    } else if (minutes < 60) {
        number = Math.floor(minutes);
        type = ' minutes';
    } else if (hours < 24) {
        number = Math.floor(hours);
        type = ' hours';
    } else if (days < 7) {
        number = Math.floor(days);
        type = ' days';
    } else if (weeks < 4) {
        number = Math.floor(weeks);
        type = ' weeks';
    } else if (months < 12) {
        Math.floor(months)
        type = ' months';
    } else {
        Math.floor(years)
        type = ' years';
    }

    if(number == 1) {
        type = type.slice(0,-1);
    }

    this.convertedDate = number + type;
  }
}
