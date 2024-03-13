import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: '[app-button]',
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericButtonComponent {
  @HostBinding('class') @Input() color: 'primary' | 'accent' = 'primary';
}