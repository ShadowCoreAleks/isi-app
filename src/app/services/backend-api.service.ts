import { inject, Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { USERS } from '../mocks/users';
import { IUser } from '../models/user.interface';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  #store = inject(StoreService);
  users = USERS;

  loadUsers(): Observable<IUser[]> {
    return of(this.users).pipe(
      delay(1500),
      tap(users => this.#store.setUsers(users))
    );
  }

  loadSpecificUser(username: string) {
    const foundUser = USERS.find(u => u.username === username);
    return of(foundUser || null);
  }

  deleteUser(username: string) {
    this.users = this.users.filter(u => u.username !== username);
    return of(this.users)
      .pipe(
        tap(users => this.#store.setUsers(users))
      );
  }
}
