import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  convertedDate: string;

  ngOnInit(): void {
    this.convertedDate = this.post.CreatedOn.split("T")[0];
  }
}
