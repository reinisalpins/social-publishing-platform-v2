import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CategoryService} from '../../services/category.service';

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
  readonly categoryService = inject(CategoryService);

  protected isMenuOpen = signal(false);
}
