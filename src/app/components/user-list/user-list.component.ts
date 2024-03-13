import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { StoreService } from '../../services/store.service';
import { userListColumns } from './user-list.constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  #store = inject(StoreService);
  #backendApiService = inject(BackendApiService);

  $users = this.#store.$users;

  protected readonly columns = userListColumns;

  ngOnInit() {
    this.#backendApiService.loadUsers().subscribe();
  }
}
