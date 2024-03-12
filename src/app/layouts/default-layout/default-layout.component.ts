import { Component } from '@angular/core';
import { CREATE_USER_PARAM } from '../../app.constants';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {
  protected readonly CREATE_USER_PARAM = CREATE_USER_PARAM;
}
