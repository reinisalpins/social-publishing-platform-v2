import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

interface NavItem {
  name: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected navItems: NavItem[] = [
    {name: 'Feed', href: '/'},
    {name: 'Sports', href: '#'},
    {name: 'Politics', href: '#'},
  ];

  protected isMenuOpen = signal(false);
}
