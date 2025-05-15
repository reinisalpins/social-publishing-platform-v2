import { Component } from '@angular/core';
import {CommentCardComponent} from '../../components/posts/comment-card/comment-card.component';

@Component({
  selector: 'app-post',
  imports: [
    CommentCardComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
