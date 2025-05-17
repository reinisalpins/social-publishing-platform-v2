import {Component, inject} from '@angular/core';
import {ToastService, Variant} from '../../services/toast.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  readonly service = inject(ToastService);
  protected readonly Variant = Variant;
}
