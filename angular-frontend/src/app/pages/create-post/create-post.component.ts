import { Component } from '@angular/core';
import {PostFormComponent} from '../../components/post-form/post-form.component';

@Component({
  selector: 'app-create-post',
  imports: [
    PostFormComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

}
