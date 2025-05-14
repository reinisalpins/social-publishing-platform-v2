import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
