import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.model';
import { map } from 'rxjs';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
  postList: Post[] = [];
  areMorePostsAvailable = true;
  page = 1;
  isLoading: boolean;
  pageScroll = 0;
  errorMsg: string;

  constructor(private httpClient: HttpClient, private eventService: EventService) {}

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: Event) {
    if(this.page === 1) return;
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if(documentHeight - scrollPosition - windowHeight < 100) {
      this.pageScroll = window.scrollY;
      // console.log(scrollY);
      // console.log(this.pageScroll);
      this.fetchPosts();
      // console.log(this.pageScroll);
    }
  }
  
  ngOnInit() {
    this.fetchPosts();
    this.eventService.popupClosed.subscribe(data => {
      this.errorMsg = "";
    })
  }

  private fetchPosts() {
    if(this.isLoading) return;
    if(!this.areMorePostsAvailable) return;
    this.isLoading = true;
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
        // this.pageScroll = window.scrollY;
        console.log(posts);
        this.postList.push(...posts);
        this.isLoading = false;
        this.page++;

        if(posts.length === 0 || posts.length < 10) {
          this.areMorePostsAvailable = false;
        }
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

  updatePosts(index: number, post: Post): string {
    return post.ConfessionId;
  }
}
