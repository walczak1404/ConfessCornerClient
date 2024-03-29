import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AddPostFormComponent } from './add-post-form/add-post-form.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { AddCommentFormComponent } from './add-comment-form/add-comment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HeaderComponent,
    PostsListComponent,
    LoadingSpinnerComponent,
    AddPostFormComponent,
    ErrorPopupComponent,
    BackdropComponent,
    PostCommentsComponent,
    AddCommentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
