import {Component, forwardRef, input, signal} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent {
  label = input<string>('');
  id = input<string>('');
  name = input<string>('');
  required = input<boolean>(false);
  placeholder = input<string>('');
  errorMessage = input<string>('');

  value = signal<string>('');
  disabled = signal<boolean>(false);

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue);
    this.onChange(newValue);
  }
}
