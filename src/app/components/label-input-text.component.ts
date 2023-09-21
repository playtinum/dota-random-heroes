import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-label-input-text',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  template: `
    <div class="w-full max-w-xs">
      <label *ngIf="label" for="randomizeCount">{{ label }}</label>
      <input type="text" (input)="onChange($any($event.target).value ?? '')" (blur)="onTouched()" [value]="value" />
      <div *ngIf="invalid && errors" class="text-red-500">
        <small *ngFor="let error of errors | keyvalue">{{ error.key }}: {{ error.value | json }}</small>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputTextComponent implements ControlValueAccessor {
  @Input() label = '';
  value = '';
  onChange!: (value: unknown) => void;
  onTouched!: () => void;
  private ngControl = inject(NgControl);

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get invalid() {
    return this.ngControl?.control?.invalid;
  }

  get errors() {
    return this.ngControl?.control?.errors;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(newValue: string | object): void {
    if (typeof newValue === 'string') {
      this.value = newValue;
    } else {
      this.value = newValue?.toString();
    }
  }
}
