import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';

/**
 * Generic type that takes in a type and returns a type with all properties as FormControl<T>
 */
export type FormGroupControls<T> = {
  [key in keyof T]: FormControl<T[key]>;
};

/**
 * Excludes nullish values from a observable pipe
 */
export const excludeNullish = filter(isNonNull);

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}
