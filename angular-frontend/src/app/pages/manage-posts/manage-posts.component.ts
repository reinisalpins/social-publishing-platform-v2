import {Component} from '@angular/core';
import {ManagePostCardComponent} from '../../components/manage-post-card/manage-post-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-manage-posts',
  imports: [
    ManagePostCardComponent,
    RouterLink
  ],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.css'
})
export class ManagePostsComponent {

}
