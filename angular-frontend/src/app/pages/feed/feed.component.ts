import { Component } from '@angular/core';
import {SearchBoxComponent} from '../../components/search-box/search-box.component';
import {PostCardComponent} from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-feed',
  imports: [
    SearchBoxComponent,
    PostCardComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

}
