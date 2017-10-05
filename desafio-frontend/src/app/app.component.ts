import { Component } from '@angular/core';
import { User } from "./User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: User;

  searched = false;
  search(text:string) {
    console.log(text);
    this.searched = true;
  }
  
}
