import { Component, OnInit } from '@angular/core';
import { UserTypeEnum } from '../../models/user-type.enum';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userTypeEnum = UserTypeEnum;

  ngOnInit(): void {
  }

}
