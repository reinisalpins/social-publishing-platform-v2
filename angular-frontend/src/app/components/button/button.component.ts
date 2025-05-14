import {Component, input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  buttonClass = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
}
