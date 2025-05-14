import { Component } from '@angular/core';
import {InputComponent} from '../input/input.component';

@Component({
  selector: 'app-search-box',
  imports: [
    InputComponent
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

}
