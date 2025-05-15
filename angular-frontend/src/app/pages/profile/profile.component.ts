import {Component} from '@angular/core';
import {
  ProfileInformationFormComponent
} from '../../components/user/profile-information-form/profile-information-form.component';
import {UpdatePasswordFormComponent} from '../../components/user/update-password-form/update-password-form.component';

@Component({
  selector: 'app-profile',
  imports: [
    ProfileInformationFormComponent,
    UpdatePasswordFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
