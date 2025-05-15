import {Component, input} from '@angular/core';
import {ButtonComponent} from "../../button/button.component";
import {Post} from '../../../models/post';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-manage-post-card',
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './manage-post-card.component.html',
  styleUrl: './manage-post-card.component.css'
})
export class ManagePostCardComponent {
  post = input.required<Post>();
}
