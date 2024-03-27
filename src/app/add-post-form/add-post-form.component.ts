import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent {
  @ViewChild('f', {static: true}) form: NgForm;
  defaultAuthor = localStorage.getItem("defaultAuthor");
  errorMsg = "";

  constructor(private http: HttpClient, private router: Router) { 
    // this.defaultAuthor = localStorage.getItem("defaultAuthor");
  }

  onNewPostAdd() {
    if(this.form.valid) {
      this.http.post(`${environment.apiURL}/Confessions`, {
        header: this.form.value.header,
        content: this.form.value.content,
        author: this.form.value.author
      }).subscribe({
        next: () => {
          localStorage.setItem("defaultAuthor", this.form.value.author);
          this.router.navigate(["/"]);
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
