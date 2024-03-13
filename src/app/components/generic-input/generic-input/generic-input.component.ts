import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  HostBinding,
  inject
} from '@angular/core';
import { GenericInputRefDirective } from '../generic-input-ref.directive';
import { FormControlDirective, FormControlName } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type controlStatus = 'VALID' | 'INVALID';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss'
})
export class GenericInputComponent implements AfterContentInit{
  @ContentChild(GenericInputRefDirective) input!: GenericInputRefDirective;
  @ContentChild(FormControlDirective) formControl!: FormControlDirective;
  @ContentChild(FormControlName) formControlName!: FormControlName;
  @HostBinding('class.input-invalid') isInputInvalid: null | boolean = false;

  #destroyRef = inject(DestroyRef);
  #cdr = inject(ChangeDetectorRef);

  @HostBinding('class.input-focus') get isInputFocus() {
    return this.input ? this.input.focus : false;
  }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('The component needs an input inside its content scope');
    }
    if (this.formControl && this.formControl.statusChanges) {
      this.isInputInvalid = this.formControl.touched ? this.formControl.invalid : false;
      this.formControl.statusChanges
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((status: controlStatus) => {
          this.isInputInvalid = status === 'INVALID';
          this.#cdr.markForCheck();
        });
    } else if (this.formControlName && this.formControlName.statusChanges) {
      this.isInputInvalid = this.formControlName.touched ? this.formControlName.invalid : false;
      this.formControlName.statusChanges
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((status: controlStatus) => {
          this.isInputInvalid = status === 'INVALID';
          this.#cdr.markForCheck();
        });
    }
  }
}
