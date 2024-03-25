import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
  postList: Post[] = [];
  page = 1;
  isLoading = true;

  constructor(private httpClient: HttpClient) {}
  
  ngOnInit() {
    this.httpClient.get<Post[]>(`${environment.apiURL}/Confessions/${this.page}`).pipe(
      map(postJson => {
        let postPost: Post[] = []
        for(const post of postJson) {
          postPost.push(new Post(post))
        }
        return postPost;
      })
    ).subscribe({
      next: (posts: Post[]) => {
        this.postList = posts;
        this.isLoading = false;
      }
    });
  }
}
