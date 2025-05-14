import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
