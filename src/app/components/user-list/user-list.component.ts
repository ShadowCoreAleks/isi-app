import { Component, inject, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  #backendApiService = inject(BackendApiService);

  users$ = this.#backendApiService.loadUsers();

  columns: string[] = [
    'Username',
    'First name',
    'Last name',
    'Email',
    'Type'
  ];
  ngOnInit(): void {
  }

}
