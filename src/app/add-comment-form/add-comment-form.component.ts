import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrl: './add-comment-form.component.css'
})
export class AddCommentFormComponent {
  @ViewChild("form", {static: false}) form: NgForm;
  @Input() postId;
  @Output() commentsAddingFinished = new EventEmitter<boolean>();
  defaultAuthor = localStorage.getItem("defaultAuthor");
  errorMsg: string;

  constructor(private http: HttpClient) {
    
  }

  stopAddingComment() {
    this.commentsAddingFinished.emit(false);
  }

  submitCommentAdd() {
    console.log(this.form); 
    if(this.form.valid) {
      this.http.post(`${environment.apiURL}/Comments`, {
        content: this.form.value.content,
        author: this.form.value.author,
        confessionId: this.postId
      }).subscribe({
        next: () => {
          localStorage.setItem("defaultAuthor", this.form.value.author);
          this.commentsAddingFinished.emit(true);
        },
        error: error => {
          console.log(error.error.errors);
          switch(error.status) {
            case 0:
            case 500:
              this.errorMsg = "Server connection failed";
              break;
            default:
              this.errorMsg = "";
              for(const key in error.error.errors) {
                this.errorMsg += error.error.errors[key].join("\n") + "\n";
                console.log(this.errorMsg);
              }
          }
        }
      })
    }
  }
}
