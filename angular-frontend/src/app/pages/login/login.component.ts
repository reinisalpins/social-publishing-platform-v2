import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {AuthService} from '../../services/auth.service';

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
  readonly authService = inject(AuthService);

  login() {
    this.authService.login({
      email: 'test',
      password: 'password'
    }).subscribe();
  }
}
