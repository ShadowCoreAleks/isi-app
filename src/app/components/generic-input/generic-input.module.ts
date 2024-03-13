import { NgModule } from '@angular/core';
import { GenericInputRefDirective } from './generic-input-ref.directive';
import { GenericInputComponent } from './generic-input/generic-input.component';


@NgModule({
  declarations: [
    GenericInputRefDirective,
    GenericInputComponent
  ],
  exports: [
    GenericInputRefDirective,
    GenericInputComponent,
  ],
  imports: []
})
export class GenericInputModule { }
