import { Component } from '@angular/core';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {
  ProfileInformationFormComponent
} from '../../components/user/profile-information-form/profile-information-form.component';
import {UpdatePasswordFormComponent} from '../../components/user/update-password-form/update-password-form.component';

@Component({
  selector: 'app-profile',
  imports: [
    InputComponent,
    ButtonComponent,
    ProfileInformationFormComponent,
    UpdatePasswordFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
