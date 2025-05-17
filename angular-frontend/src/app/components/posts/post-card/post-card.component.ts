import {Component, input} from '@angular/core';
import {Post} from '../../../models/post';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  readonly post = input.required<Post>();

  protected truncateContent(content: string) {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  }
}
