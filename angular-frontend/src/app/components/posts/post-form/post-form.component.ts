import { Component } from '@angular/core';
import {ButtonComponent} from '../../button/button.component';
import {InputComponent} from '../../input/input.component';
import {TextareaComponent} from '../../textarea/textarea.component';
import {MultipleSelectComponent} from '../../multiple-select/multiple-select.component';

@Component({
  selector: 'app-post-form',
  imports: [
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    MultipleSelectComponent
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

}
