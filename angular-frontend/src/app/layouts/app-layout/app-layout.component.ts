import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
