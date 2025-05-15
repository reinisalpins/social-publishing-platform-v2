import {Component, forwardRef, input, signal} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-multiple-select',
  imports: [],
  templateUrl: './multiple-select.component.html',
  styleUrl: './multiple-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleSelectComponent),
      multi: true
    }
  ]
})
export class MultipleSelectComponent {
  label = input<string>('');
  id = input<string>('');
  name = input<string>('');
  required = input<boolean>(false);
  placeholder = input<string>('');
  errorMessage = input<string>('');
  options = input.required<Option[]>();

  value = signal<string[]>([]);
  disabled = signal<boolean>(false);

  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value.set(Array.isArray(value) ? value : []);
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
    const select = event.target as HTMLSelectElement;
    const selectedValues: string[] = Array.from(select.selectedOptions).map(option => option.value);
    this.value.set(selectedValues);
    this.onChange(selectedValues);
  }
}
