import {Injectable, signal} from '@angular/core';

export enum Variant {
  SUCCESS = 'success',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public isVisible = signal(false);
  public message = signal('');
  public variant = signal(Variant.SUCCESS);

  public showToast(
    message: string,
    duration: number = 3000,
    variant: Variant = Variant.SUCCESS
  ) {
    if (this.isVisible()) {
      return;
    }

    this.isVisible.set(true);
    this.message.set(message);
    this.variant.set(variant);
    setTimeout(() => {
      this.isVisible.set(false);
      this.message.set('');
      this.variant.set(Variant.SUCCESS);
    }, duration);
  }
}
