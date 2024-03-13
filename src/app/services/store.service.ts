import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  #users: WritableSignal<IUser[]> = signal([]);
  $users = computed(() => this.#users());

  setUsers(users: IUser[]) {
    this.#users.set(users);
  }
}
