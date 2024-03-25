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

  constructor(private http: HttpClient, private router: Router) { }

  onNewPostAdd() {
    if(this.form.valid) {
      this.http.post(`${environment.apiURL}/Confessions`, {
        header: this.form.value.header,
        content: this.form.value.content,
        author: this.form.value.author
      }).subscribe({
        next: () => {
          this.router.navigate(["/"]);
        },
        error: () => {alert("CHUJNIA")}
      })
    }
  }
}
