import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostFormComponent } from './add-post-form/add-post-form.component';

const routes: Routes = [
  {path: "", component: PostsListComponent},
  {path: "add-post", component: AddPostFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
